import { Tool } from '@/app/dashboard/planner/types';
import { readdirSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const toolsDir = join(process.cwd(), 'src/app/dashboard/tools');
    const directories = readdirSync(toolsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory());

    const tools: Tool[] = directories.map((dir, index) => ({
      id: index + 1,
      title: dir.name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      type: dir.name,
      path: `/dashboard/tools/${dir.name}`,
      status: 'active'
    }));

    return NextResponse.json(tools);
  } catch (error) {
    console.error('Error reading tools directory:', error);
    return NextResponse.json([], { status: 500 });
  }
} 