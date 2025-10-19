import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const categoriesFilePath = path.join(process.cwd(), 'data', 'categories.json');

export async function GET() {
  try {
    const fileContent = await fs.readFile(categoriesFilePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading categories:', error);
    return NextResponse.json({ error: 'Failed to read categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json({ error: 'Category name required' }, { status: 400 });
    }
    const fileContent = await fs.readFile(categoriesFilePath, 'utf-8');
    const data = JSON.parse(fileContent);
    const newId = data.categories.length > 0 ? Math.max(...data.categories.map((c: any) => c.id)) + 1 : 1;
    const newCategory = { id: newId, name };
    data.categories.push(newCategory);
    await fs.writeFile(categoriesFilePath, JSON.stringify(data, null, 2));
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}