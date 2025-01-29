// app/api/hello/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from the API!" });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      message: "Data received successfully",
      data: body,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      message: "Update successful",
      data: body,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 400 });
  }
}

export async function DELETE() {
  return NextResponse.json({
    message: "Resource deleted successfully",
  });
}
