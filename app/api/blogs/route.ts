import { NextResponse } from "next/server";
// import fs from 'fs/promises';
import path from "path";
import { BlogPost } from "../../../lib/utils";
import { promises as fs } from "fs";

const blogsFilePath = path.join(process.cwd(), "data", "blogs.json");

// export async function GET(request: Request) {
//   try {
//     const fileContent = await fs.readFile(blogsFilePath, 'utf-8');
//     const data = JSON.parse(fileContent);
//     // Resolve category, tags, and author
//     const categories = JSON.parse(await fs.readFile(path.join(process.cwd(), 'data', 'categories.json'), 'utf-8')).categories;
//     const tags = JSON.parse(await fs.readFile(path.join(process.cwd(), 'data', 'tags.json'), 'utf-8')).tags;
//     const authors = JSON.parse(await fs.readFile(path.join(process.cwd(), 'data', 'authors.json'), 'utf-8')).authors;

//     const posts: BlogPost[] = data.posts.map((post: any) => ({
//       ...post,
//       category: categories.find((c: any) => c.id === post.categoryId),
//       tags: tags.filter((t: any) => post.tagIds.includes(t.id)),
//       author: authors.find((a: any) => a.id === post.authorId),
//     }));

//     return NextResponse.json({ posts });
//   } catch (error) {
//     console.error('Error reading blogs:', error);
//     return NextResponse.json({ error: 'Failed to read blogs' }, { status: 500 });
//   }
// }

export async function GET() {
  try {
    // Path to blogs.json
    const blogsFilePath = path.join(process.cwd(), "data", "blogs.json");

    // Read and parse all required JSON files
    const [blogsData, categoriesData, tagsData, authorsData] =
      await Promise.all([
        fs.readFile(blogsFilePath, "utf-8"),
        fs.readFile(
          path.join(process.cwd(), "data", "categories.json"),
          "utf-8"
        ),
        fs.readFile(path.join(process.cwd(), "data", "tags.json"), "utf-8"),
        fs.readFile(path.join(process.cwd(), "data", "authors.json"), "utf-8"),
      ]);

    const blogs = JSON.parse(blogsData);
    const categories = JSON.parse(categoriesData).categories;
    const tags = JSON.parse(tagsData).tags;
    const authors = JSON.parse(authorsData).authors;

    // Map relationships
    const posts = blogs.posts.map((post: any) => ({
      ...post,
      category: categories.find((c: any) => c.id === post.categoryId),
      tags: tags.filter((t: any) => post.tagIds.includes(t.id)),
      author: authors.find((a: any) => a.id === post.authorId),
    }));

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error reading blogs:", error);
    return NextResponse.json(
      { error: "Failed to read blogs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newPost = await request.json();
    const fileContent = await fs.readFile(blogsFilePath, "utf-8");
    const data = JSON.parse(fileContent);
    const newId =
      data.posts.length > 0
        ? Math.max(...data.posts.map((p: any) => p.id)) + 1
        : 1;
    const post = {
      id: newId,
      ...newPost,
      categoryId: parseInt(newPost.categoryId),
      tagIds: newPost.tagIds.map((id: string) => parseInt(id)),
      authorId: parseInt(newPost.authorId),
    };
    data.posts.push(post);
    await fs.writeFile(blogsFilePath, JSON.stringify(data, null, 2));
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Post ID required" }, { status: 400 });
    }
    const fileContent = await fs.readFile(blogsFilePath, "utf-8");
    const data = JSON.parse(fileContent);
    data.posts = data.posts.filter((post: any) => post.id !== parseInt(id));
    await fs.writeFile(blogsFilePath, JSON.stringify(data, null, 2));
    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
