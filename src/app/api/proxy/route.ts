import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const response = await fetch('http://localhost:1234/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    // Clean the response content
    if (data.choices && data.choices[0]?.message?.content) {
      const content = data.choices[0].message.content;
      // Remove <thinking> tags and their content while preserving newlines
      const cleanedContent = content
        .replace(/<thinking>[\s\S]*?<\/thinking>/g, '')
        .replace(/<think>[\s\S]*?<\/think>/g, '')
        .trim();
      data.choices[0].message.content = cleanedContent;
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch from AI service' },
      { status: 500 }
    );
  }
} 