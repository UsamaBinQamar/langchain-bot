import { NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import path from "path";

export async function POST() {
  try {
    // 1. Set exact filename
    const pdfFileName = "txt2pdf_679a67977d511.pdf";

    // 2. Construct absolute path
    const pdfPath = path.join(process.cwd(), "public", pdfFileName);

    // 3. Load PDF
    const loader = new PDFLoader(pdfPath);
    const docs = await loader.load();

    // 4. Log and return the first page's content
    console.log("Extracted content:", docs[0].pageContent);
    return NextResponse.json({
      success: true,
      content: docs[0].pageContent,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error:", errorMessage);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
