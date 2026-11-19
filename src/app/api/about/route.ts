import { NextResponse } from "next/server";
import { getAboutSection, updateAboutSection } from "@/lib/portfolio-service";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const data = await getAboutSection();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET /api/about:", error);
    return NextResponse.json({ error: "Failed to fetch about section" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { firstDescription, secondDescription, imageUrl, imageAlt } = body;

    if (!firstDescription || !secondDescription || !imageUrl) {
      return NextResponse.json(
        { error: "firstDescription, secondDescription, and imageUrl are required." },
        { status: 400 },
      );
    }

    const success = await updateAboutSection(
      firstDescription,
      secondDescription,
      imageUrl,
      imageAlt,
    );
    return NextResponse.json({ success, message: "About section updated successfully." });
  } catch (error) {
    console.error("Error in PUT /api/about:", error);
    return NextResponse.json({ error: "Failed to update about section" }, { status: 500 });
  }
}
