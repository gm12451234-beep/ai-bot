import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return NextResponse.json({ text: response.text() });
  } catch (error) {
    return NextResponse.json({ text: "Error: API Key sahi nahi hai ya koi aur masla hai." }, { status: 500 });
  }
}
