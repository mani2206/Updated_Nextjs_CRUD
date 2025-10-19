import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const tagsFilePath = path.join(process.cwd(), 'data', 'tags.json');

export async function GET() {
  try {
    const fileContent = await fs.readFile(tagsFilePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading tags:', error);
    return NextResponse.json({ error: 'Failed to read tags' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json({ error: 'Tag name required' }, { status: 400 });
    }
    const fileContent = await fs.readFile(tagsFilePath, 'utf-8');
    const data = JSON.parse(fileContent);
    const newId = data.tags.length > 0 ? Math.max(...data.tags.map((t: any) => t.id)) + 1 : 1;
    const newTag = { id: newId, name };
    data.tags.push(newTag);
    await fs.writeFile(tagsFilePath, JSON.stringify(data, null, 2));
    return NextResponse.json(newTag, { status: 201 });
  } catch (error) {
    console.error('Error creating tag:', error);
    return NextResponse.json({ error: 'Failed to create tag' }, { status: 500 });
  }
}