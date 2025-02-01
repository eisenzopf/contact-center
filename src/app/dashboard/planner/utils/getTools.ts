import { Tool } from '../types';
import fs from 'fs';
import path from 'path';

export const getTools = async (): Promise<Tool[]> => {
  const toolsDir = path.join(process.cwd(), 'src/app/dashboard/tools');
  
  try {
    const directories = fs.readdirSync(toolsDir, { withFileTypes: true })
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

    return tools;
  } catch (error) {
    console.error('Error reading tools directory:', error);
    return [];
  }
}; 