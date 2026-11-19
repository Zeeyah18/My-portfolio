import { NextResponse } from "next/server";
import { getSkills, createSkill, updateSkill, deleteSkill } from "@/lib/portfolio-service";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const data = await getSkills();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET /api/skills:", error);
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { name, iconKey, displayOrder } = body;
    if (!name || !iconKey) {
      return NextResponse.json({ error: "Name and iconKey are required" }, { status: 400 });
    }

    const skill = await createSkill({ name, iconKey, displayOrder: displayOrder ? Number(displayOrder) : undefined });
    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/skills:", error);
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { id, name, iconKey, displayOrder, isActive } = body;
    if (!id) return NextResponse.json({ error: "Skill ID is required" }, { status: 400 });

    const success = await updateSkill(Number(id), {
      name,
      iconKey,
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : undefined,
      isActive,
    });
    return NextResponse.json({ success });
  } catch (error) {
    console.error("Error in PUT /api/skills:", error);
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Skill ID is required" }, { status: 400 });

    const success = await deleteSkill(Number(id));
    return NextResponse.json({ success });
  } catch (error) {
    console.error("Error in DELETE /api/skills:", error);
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}
