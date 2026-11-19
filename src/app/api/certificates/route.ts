import { NextResponse } from "next/server";
import { getCertificates, createCertificate, updateCertificate, deleteCertificate } from "@/lib/portfolio-service";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const data = await getCertificates();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET /api/certificates:", error);
    return NextResponse.json({ error: "Failed to fetch certificates" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { title, aboutCertificate, year, imageUrl, iconName, displayOrder } = body;
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const cert = await createCertificate({
      title,
      aboutCertificate,
      year,
      imageUrl,
      iconName,
      displayOrder: displayOrder ? Number(displayOrder) : undefined,
    });
    return NextResponse.json(cert, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/certificates:", error);
    return NextResponse.json({ error: "Failed to create certificate" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { id, title, aboutCertificate, year, imageUrl, iconName, displayOrder, isActive } = body;
    if (!id) return NextResponse.json({ error: "Certificate ID is required" }, { status: 400 });

    const success = await updateCertificate(Number(id), {
      title,
      aboutCertificate,
      year,
      imageUrl,
      iconName,
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : undefined,
      isActive,
    });
    return NextResponse.json({ success });
  } catch (error) {
    console.error("Error in PUT /api/certificates:", error);
    return NextResponse.json({ error: "Failed to update certificate" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Certificate ID is required" }, { status: 400 });

    const success = await deleteCertificate(Number(id));
    return NextResponse.json({ success });
  } catch (error) {
    console.error("Error in DELETE /api/certificates:", error);
    return NextResponse.json({ error: "Failed to delete certificate" }, { status: 500 });
  }
}
