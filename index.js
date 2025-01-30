import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

async function createVectorStore() {
  try {
    // Load and split the text
    const result = await fetch("scrimba-info.txt");
    console.log("🚀 ~ createVectorStore ~ result:", result);
    const text = await result.text();
    console.log("🚀 ~ createVectorStore ~ text:", text);

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
      separators: ["\n\n", "\n", " ", ""], // default setting
    });
    console.log("🚀 ~ createVectorStore ~ splitter:", splitter);

    const output = await splitter.createDocuments([text]);
    console.log("🚀 ~ createVectorStore ~ output:", output);

    // Create Supabase client using Vite environment variables
    const client = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_API_KEY
    );

    // Create vector store with secure API key handling
    await SupabaseVectorStore.fromDocuments(
      output,
      new OpenAIEmbeddings({
        openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
      }),
      {
        client,
        tableName: "documents",
      }
    );

    console.log("Vector store created successfully");
  } catch (err) {
    console.error("Error creating vector store:", err);
  }
}

// Execute the function
createVectorStore();
