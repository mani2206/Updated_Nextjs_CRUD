export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  categories: string[];
  author: string;
  authorName: string;
  date: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Introduction to Next.js 14",
    excerpt: "Next.js 14 brings exciting new features and improvements for building modern web applications with React. Learn about the latest updates and how to get started.",
    content: "Next.js 14 brings exciting new features and improvements for building modern web applications with React. Learn about the latest updates and how to get started. This release includes better performance, improved developer experience, and new APIs for server components.",
    tags: ["nextjs", "react", "webdev"],
    categories: ["tech"],
    author: "john",
    authorName: "John Doe",
    date: "2025-09-10",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    title: "Healthy Eating Habits",
    excerpt: "Discover simple ways to incorporate healthy eating habits into your daily routine. From meal prepping to mindful eating, these tips will help you stay on track.",
    content: "Discover simple ways to incorporate healthy eating habits into your daily routine. From meal prepping to mindful eating, these tips will help you stay on track with your nutrition goals. Start small and build sustainable habits over time.",
    tags: ["health", "nutrition"],
    categories: ["lifestyle", "food"],
    author: "jane",
    authorName: "Jane Smith",
    date: "2025-09-05",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    title: "Exploring Tokyo: A Travel Guide",
    excerpt: "Tokyo is a vibrant city full of contrasts. From ancient temples to futuristic skyscrapers, this guide covers the must-see spots and hidden gems.",
    content: "Tokyo is a vibrant city full of contrasts. From ancient temples to futuristic skyscrapers, this guide covers the must-see spots and hidden gems that every traveler should experience. Don't miss the food scene!",
    tags: ["travel", "japan"],
    categories: ["travel"],
    author: "bob",
    authorName: "Bob Johnson",
    date: "2025-09-01",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 4,
    title: "Advanced React Patterns",
    excerpt: "Dive deep into advanced React patterns and best practices. Learn about custom hooks, compound components, and higher-order components to level up your React skills.",
    content: "Dive deep into advanced React patterns and best practices. Learn about custom hooks, compound components, and higher-order components to level up your React skills. These techniques will make your code more reusable and maintainable.",
    tags: ["react", "javascript", "webdev"],
    categories: ["tech"],
    author: "john",
    authorName: "John Doe",
    date: "2025-08-28",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 5,
    title: "Delicious Italian Recipes",
    excerpt: "Bring Italy to your kitchen with these authentic Italian recipes. From pasta to tiramisu, learn how to make classic dishes with simple ingredients.",
    content: "Bring Italy to your kitchen with these authentic Italian recipes. From pasta to tiramisu, learn how to make classic dishes with simple ingredients. Perfect for family dinners or date nights at home.",
    tags: ["food", "cooking", "italian"],
    categories: ["food"],
    author: "jane",
    authorName: "Jane Smith",
    date: "2025-08-25",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb961ad5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  }
];



export async function fetchBlogs() {
  const response = await fetch('/api/blogs');
  if (!response.ok) throw new Error('Failed to fetch blogs');
  return response.json();
}

export async function fetchCategories() {
  const response = await fetch('/api/categories');
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
}

export async function fetchTags() {
  const response = await fetch('/api/tags');
  if (!response.ok) throw new Error('Failed to fetch tags');
  return response.json();
}

export async function fetchAuthors() {
  const response = await fetch('/api/authors');
  if (!response.ok) throw new Error('Failed to fetch authors');
  return response.json();
}