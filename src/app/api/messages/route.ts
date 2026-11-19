import { NextResponse } from "next/server";
import { getContactMessages, deleteContactMessage } from "@/lib/portfolio-service";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const messages = await getContactMessages();
    return NextResponse.json({ count: messages.length, messages });
  } catch (error) {
    console.error("Error in GET /api/messages:", error);
    return NextResponse.json({ error: "Failed to fetch contact messages" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Message ID is required" }, { status: 400 });
    }

    const success = await deleteContactMessage(id);
    return NextResponse.json({ success });
  } catch (error) {
    console.error("Error in DELETE /api/messages:", error);
    return NextResponse.json({ error: "Failed to delete contact message" }, { status: 500 });
  }
}
