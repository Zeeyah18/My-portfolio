import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { deleteResume, getResumeFile, getResumeMeta, saveResume } from "@/lib/portfolio-service";

export const dynamic = "force-dynamic";

const MAX_RESUME_BYTES = 8 * 1024 * 1024;

function safeFilename(name: string) {
  const base = name.split(/[/\\]/).pop() || "resume.pdf";
  const cleaned = base.replace(/[^\w.\- ()]/g, "").slice(0, 180) || "resume.pdf";
  return cleaned.toLowerCase().endsWith(".pdf") ? cleaned : `${cleaned}.pdf`;
}

export async function GET(request: NextRequest) {
  try {
    if (request.nextUrl.searchParams.get("meta") === "1") {
      const resume = await getResumeMeta();
      return NextResponse.json({ resume });
    }

    const file = await getResumeFile();
    if (!file) {
      return NextResponse.json({ error: "No resume has been uploaded yet." }, { status: 404 });
    }

    return new NextResponse(file.bytes as unknown as BodyInit, {
      headers: {
        "Content-Type": file.contentType || "application/pdf",
        "Content-Disposition": `inline; filename="${file.filename.replace(/"/g, "")}"`,
        "Content-Length": String(file.bytes.byteLength),
        "Cache-Control": "private, no-cache",
      },
    });
  } catch (error) {
    console.error("Error in GET /api/resume:", error);
    return NextResponse.json({ error: "Failed to load resume" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Choose a PDF to upload." }, { status: 400 });
    }

    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      return NextResponse.json({ error: "Only PDF files can be used as the resume." }, { status: 400 });
    }

    if (file.size > MAX_RESUME_BYTES) {
      return NextResponse.json({ error: "Resume must be 8MB or smaller." }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const resume = await saveResume(safeFilename(file.name), bytes);
    return NextResponse.json({ success: true, resume });
  } catch (error) {
    console.error("Error in POST /api/resume:", error);
    const message = error instanceof Error ? error.message : "Failed to save resume";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await deleteResume();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/resume:", error);
    return NextResponse.json({ error: "Failed to remove resume" }, { status: 500 });
  }
}
