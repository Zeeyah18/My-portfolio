import { NextResponse } from "next/server";
import { getHeroSection, updateHeroSection } from "@/lib/portfolio-service";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const data = await getHeroSection();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET /api/hero:", error);
    return NextResponse.json({ error: "Failed to fetch hero section" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { imageUrl, imageAlt, headline, subheadline, description, badgeText, noteText } = body;

    const success = await updateHeroSection({
      imageUrl,
      imageAlt,
      headline,
      subheadline,
      description,
      badgeText,
      noteText,
    });

    return NextResponse.json({ success, message: "Hero section updated successfully." });
  } catch (error) {
    console.error("Error in PUT /api/hero:", error);
    return NextResponse.json({ error: "Failed to update hero section" }, { status: 500 });
  }
}
