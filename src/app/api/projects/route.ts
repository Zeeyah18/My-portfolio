import { NextResponse } from "next/server";
import { getProjects, createProject, updateProject, deleteProject } from "@/lib/portfolio-service";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const data = await getProjects();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET /api/projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { name, description, imageUrl, liveUrl, githubUrl, displayOrder } = body;
    if (!name || !description) {
      return NextResponse.json({ error: "Name and description are required" }, { status: 400 });
    }

    const project = await createProject({
      name,
      description,
      imageUrl,
      liveUrl,
      githubUrl,
      displayOrder: displayOrder ? Number(displayOrder) : undefined,
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/projects:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { id, name, description, imageUrl, liveUrl, githubUrl, displayOrder, isActive } = body;
    if (!id) return NextResponse.json({ error: "Project ID is required" }, { status: 400 });

    const success = await updateProject(Number(id), {
      name,
      description,
      imageUrl,
      liveUrl,
      githubUrl,
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : undefined,
      isActive,
    });
    return NextResponse.json({ success });
  } catch (error) {
    console.error("Error in PUT /api/projects:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Project ID is required" }, { status: 400 });

    const success = await deleteProject(Number(id));
    return NextResponse.json({ success });
  } catch (error) {
    console.error("Error in DELETE /api/projects:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
