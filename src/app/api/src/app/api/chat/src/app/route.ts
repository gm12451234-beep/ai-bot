import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const lastMessage = messages[messages.length - 1].content;
    const result = await model.generateContent(lastMessage);
    const response = await result.response;
    return NextResponse.json({ message: response.text(), success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to chat', success: false }, { status: 500 });
  }
}
