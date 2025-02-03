import { NextResponse } from 'next/server';

const TIMEOUT_MS = 60000; // 60 seconds timeout

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
    
    const response = await fetch('http://localhost:1234/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    // Ensure the response is properly formatted
    if (data.choices && data.choices[0]?.message) {
      const message = data.choices[0].message;
      
      // Clean any thinking tags from content if present
      if (message.content) {
        message.content = message.content
          .replace(/<thinking>[\s\S]*?<\/thinking>/g, '')
          .replace(/<think>[\s\S]*?<\/think>/g, '')
          .trim();
      }

      // Ensure tool_calls is properly formatted if present
      if (message.tool_calls) {
        message.tool_calls = message.tool_calls.map((call: any) => ({
          id: call.id,
          type: call.type,
          function: {
            name: call.function.name,
            arguments: call.function.arguments
          }
        }));
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    
    // Check if it's a timeout error
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timed out' },
        { status: 504 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch from AI service' },
      { status: 500 }
    );
  }
} 