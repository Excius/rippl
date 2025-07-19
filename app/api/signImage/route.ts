import { cloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paramsToSign } = body;

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    );

    return NextResponse.json({ signature });
  } catch (error) {
    console.error("Error signing upload:", error);
    return NextResponse.json(
      { error: "Failed to sign upload" },
      { status: 500 }
    );
  }
}
