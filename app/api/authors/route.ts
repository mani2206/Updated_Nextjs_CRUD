import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const authorsFilePath = path.join(process.cwd(), 'data', 'authors.json');

// export async function GET() {
//   try {
//     // If file does not exist, create it with empty array
//     try {
//       await fs.access(authorsFilePath);
//     } catch {
//       await fs.writeFile(authorsFilePath, JSON.stringify({ authors: [] }, null, 2));
//     }

//     const fileContent = await fs.readFile(authorsFilePath, 'utf-8');
//     const data = JSON.parse(fileContent);
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error('Error reading authors:', error);
//     return NextResponse.json({ error: 'Failed to read authors' }, { status: 500 });
//   }
// }

export async function GET() {
  try {
    const fileContent = await fs.readFile(authorsFilePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading authors:', error);
    return NextResponse.json({ error: 'Failed to read authors' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json({ error: 'Author name required' }, { status: 400 });
    }
    const fileContent = await fs.readFile(authorsFilePath, 'utf-8');
    const data = JSON.parse(fileContent);
    const newId = data.authors.length > 0 ? Math.max(...data.authors.map((a: any) => a.id)) + 1 : 1;
    const newAuthor = { id: newId, name };
    data.authors.push(newAuthor);
    await fs.writeFile(authorsFilePath, JSON.stringify(data, null, 2));
    return NextResponse.json(newAuthor, { status: 201 });
  } catch (error) {
    console.error('Error creating author:', error);
    return NextResponse.json({ error: 'Failed to create author' }, { status: 500 });
  }
}