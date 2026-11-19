import { NextResponse } from "next/server";
import { getSiteSettings, updateSiteSettings } from "@/lib/portfolio-service";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const data = await getSiteSettings();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET /api/settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const success = await updateSiteSettings(body);
    return NextResponse.json({ success, message: "Settings updated successfully." });
  } catch (error) {
    console.error("Error in PUT /api/settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
