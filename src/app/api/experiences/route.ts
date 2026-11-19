import { NextResponse } from "next/server";
import { getExperiences, createExperience, updateExperience, deleteExperience } from "@/lib/portfolio-service";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const data = await getExperiences();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET /api/experiences:", error);
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { title, organization, period, description, displayOrder } = body;
    if (!title || !organization || !period || !description) {
      return NextResponse.json(
        { error: "Title, organization, period, and description are required" },
        { status: 400 },
      );
    }

    const exp = await createExperience({
      title,
      organization,
      period,
      description,
      displayOrder: displayOrder ? Number(displayOrder) : undefined,
    });
    return NextResponse.json(exp, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/experiences:", error);
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { id, title, organization, period, description, displayOrder, isActive } = body;
    if (!id) return NextResponse.json({ error: "Experience ID is required" }, { status: 400 });

    const success = await updateExperience(Number(id), {
      title,
      organization,
      period,
      description,
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : undefined,
      isActive,
    });
    return NextResponse.json({ success });
  } catch (error) {
    console.error("Error in PUT /api/experiences:", error);
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Experience ID is required" }, { status: 400 });

    const success = await deleteExperience(Number(id));
    return NextResponse.json({ success });
  } catch (error) {
    console.error("Error in DELETE /api/experiences:", error);
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  }
}
