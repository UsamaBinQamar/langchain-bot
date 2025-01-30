// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { createClient } from "@supabase/supabase-js";
// import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
// import { OpenAIEmbeddings } from "langchain/embeddings/openai";

// async function createVectorStore() {
//   try {
//     // Load and split the text
//     const result = await fetch("scrimba-info.txt");
//     console.log("🚀 ~ createVectorStore ~ result:", result);
//     const text = await result.text();
//     console.log("🚀 ~ createVectorStore ~ text:", text);

//     const splitter = new RecursiveCharacterTextSplitter({
//       chunkSize: 500,
//       chunkOverlap: 50,
//       separators: ["\n\n", "\n", " ", ""], // default setting
//     });
//     console.log("🚀 ~ createVectorStore ~ splitter:", splitter);

//     const output = await splitter.createDocuments([text]);
//     console.log("🚀 ~ createVectorStore ~ output:", output);

//     // Create Supabase client using Vite environment variables
//     const client = createClient(
//       import.meta.env.VITE_SUPABASE_URL,
//       import.meta.env.VITE_SUPABASE_API_KEY
//     );

//     // Create vector store with secure API key handling
//     await SupabaseVectorStore.fromDocuments(
//       output,
//       new OpenAIEmbeddings({
//         openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
//       }),
//       {
//         client,
//         tableName: "documents",
//       }
//     );

//     console.log("Vector store created successfully");
//   } catch (err) {
//     console.error("Error creating vector store:", err);
//   }
// }

// // Execute the function
// createVectorStore();

// ===============================convert string questions into standalone questions===============================================================================================

// import { ChatOpenAI } from "langchain/chat_models/openai";
// import { PromptTemplate } from "langchain/prompts";

// document.addEventListener("submit", (e) => {
//   e.preventDefault();
//   progressConversation();
// });

// const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY;
// const llm = new ChatOpenAI({ openAIApiKey });

// /**
//  * Challenge:
//  * 1. Create a prompt to turn a user's question into a
//  *    standalone question. (Hint: the AI understands
//  *    the concept of a standalone question. You don't
//  *    need to explain it, just ask for it.)
//  * 2. Create a chain with the prompt and the model.
//  * 3. Invoke the chain remembering to pass in a question.
//  * 4. Log out the response.
//  * **/

// // A string holding the phrasing of the prompt
// const standaloneQuestionTemplate =
//   "Given a question, convert it to a standalone question. question: {question} standalone question:";

// // A prompt created using PromptTemplate and the fromTemplate method
// const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
//   standaloneQuestionTemplate
// );
// console.log("🚀 ~ standaloneQuestionPrompt:", standaloneQuestionPrompt);

// // Take the standaloneQuestionPrompt and PIPE the model
// const standaloneQuestionChain = standaloneQuestionPrompt.pipe(llm);
// console.log("🚀 ~ standaloneQuestionChain:", standaloneQuestionChain);

// // Await the response when you INVOKE the chain.
// // Remember to pass in a question.
// const response = await standaloneQuestionChain.invoke({
//   question:
//     "What are the technical requirements for running Scrimba? I only have a very old laptop which is not that powerful.",
// });

// console.log(response);
// async function progressConversation() {
//   const userInput = document.getElementById("user-input");
//   const chatbotConversation = document.getElementById(
//     "chatbot-conversation-container"
//   );
//   const question = userInput.value;
//   userInput.value = "";

//   // add human message
//   const newHumanSpeechBubble = document.createElement("div");
//   newHumanSpeechBubble.classList.add("speech", "speech-human");
//   chatbotConversation.appendChild(newHumanSpeechBubble);
//   newHumanSpeechBubble.textContent = question;
//   chatbotConversation.scrollTop = chatbotConversation.scrollHeight;

//   // add AI message
//   const newAiSpeechBubble = document.createElement("div");
//   newAiSpeechBubble.classList.add("speech", "speech-ai");
//   chatbotConversation.appendChild(newAiSpeechBubble);
//   newAiSpeechBubble.textContent = result;
//   chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
// }

// ==========================================================give 4 output for Embeddings from 4 different retrievers from vector store================================================================================================

// import { ChatOpenAI } from "langchain/chat_models/openai";
// import { PromptTemplate } from "langchain/prompts";
// import { StringOutputParser } from "langchain/schema/output_parser";
// import { retriever } from "/utils/retriever";

// document.addEventListener("submit", (e) => {
//   e.preventDefault();
//   progressConversation();
// });

// const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY;
// const llm = new ChatOpenAI({ openAIApiKey });

// const standaloneQuestionTemplate =
//   "Given a question, convert it to a standalone question. question: {question} standalone question:";

// const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
//   standaloneQuestionTemplate
// );

// /**
//  * Challenge:
//  * 1. Create a template and prompt to get an answer to
//  *    the user's original question. Remember to include
//  *    the original question and the text chunks we got
//  *    back from the vector store as input variables. Call
//  *    these input variables 'original_question' and 'context'.
//  * ⚠️ Feel free to add this to the chain, but you will get
//  *    an error.
//  *
//  * We want this chatbot to:
//  *  - be friendly
//  *  - only answer from the context provided and never make up
//  *    answers
//  *  - apologise if it doesn't know the answer and advise the
//  *    user to email help@scrimba.com
//  */

// const chain = standaloneQuestionPrompt
//   .pipe(llm)
//   .pipe(new StringOutputParser())
//   .pipe(retriever);

// const response = await chain.invoke({
//   question:
//     "What are the technical requirements for running Scrimba? I only have a very old laptop which is not that powerful.",
// });

// console.log("🚀 ~ response:", response);

// async function progressConversation() {
//   const userInput = document.getElementById("user-input");
//   const chatbotConversation = document.getElementById(
//     "chatbot-conversation-container"
//   );
//   const question = userInput.value;
//   userInput.value = "";

//   // add human message
//   const newHumanSpeechBubble = document.createElement("div");
//   newHumanSpeechBubble.classList.add("speech", "speech-human");
//   chatbotConversation.appendChild(newHumanSpeechBubble);
//   newHumanSpeechBubble.textContent = question;
//   chatbotConversation.scrollTop = chatbotConversation.scrollHeight;

//   // add AI message
//   const newAiSpeechBubble = document.createElement("div");
//   newAiSpeechBubble.classList.add("speech", "speech-ai");
//   chatbotConversation.appendChild(newAiSpeechBubble);
//   newAiSpeechBubble.textContent = result;
//   chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
// }

// =============================================matching=============================================

import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { StringOutputParser } from "langchain/schema/output_parser";
import { retriever } from "/utils/retriever";

document.addEventListener("submit", (e) => {
  e.preventDefault();
  progressConversation();
});

const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY;
const llm = new ChatOpenAI({ openAIApiKey });

const standaloneQuestionTemplate =
  "Given a question, convert it to a standalone question. question: {question} standalone question:";

const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
  standaloneQuestionTemplate
);

const standaloneQuestionChain = standaloneQuestionPrompt.invoke({
  question: "What is scrim for",
});

console.log(standaloneQuestionPrompt);

/**
 * Challenge:
 * 1. Create a template and prompt to get an answer to
 *    the user's original question. Remember to include
 *    the original question and the text chunks we got
 *    back from the vector store as input variables. Call
 *    these input variables 'question' and 'context'.
 * ⚠️ Feel free to add this to the chain, but you will get
 *    an error.
 *
 * We want this chatbot to:
 *  - be friendly
 *  - only answer from the context provided and never make up
 *    answers
 *  - apologise if it doesn't know the answer and advise the
 *    user to email help@scrimba.com
 */

const chain = standaloneQuestionPrompt
  .pipe(llm)
  .pipe(new StringOutputParser())
  .pipe(retriever);

const response = await chain.invoke({
  question:
    "What are the technical requirements for running Scrimba? I only have a very old laptop which is not that powerful.",
});

console.log(response);

async function progressConversation() {
  const userInput = document.getElementById("user-input");
  const chatbotConversation = document.getElementById(
    "chatbot-conversation-container"
  );
  const question = userInput.value;
  userInput.value = "";

  // add human message
  const newHumanSpeechBubble = document.createElement("div");
  newHumanSpeechBubble.classList.add("speech", "speech-human");
  chatbotConversation.appendChild(newHumanSpeechBubble);
  newHumanSpeechBubble.textContent = question;
  chatbotConversation.scrollTop = chatbotConversation.scrollHeight;

  // add AI message
  const newAiSpeechBubble = document.createElement("div");
  newAiSpeechBubble.classList.add("speech", "speech-ai");
  chatbotConversation.appendChild(newAiSpeechBubble);
  newAiSpeechBubble.textContent = result;
  chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
}
