import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { uploadImageToCloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in as admin to upload files." },
        { status: 401 }
      );
    }

    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        {
          error:
            "Cloudinary is not configured yet. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to your .env file.",
        },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "portfolio";

    if (!file) {
      return NextResponse.json(
        { error: "No file provided. Please select an image to upload." },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Invalid file type. Only image files (PNG, JPG, WebP, etc.) are supported." },
        { status: 400 }
      );
    }

    // Max 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size exceeds the 10MB limit." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadImageToCloudinary(buffer, folder);

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
    });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    const message = error instanceof Error ? error.message : "Failed to upload file to Cloudinary";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
