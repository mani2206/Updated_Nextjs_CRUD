



'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface BlogFormData {
  title: string;
  image: string;
  content: string;
  categoryId: string;
  tagIds: string[];
  authorId: string;
}

export default function BlogForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    image: '',
    content: '',
    categoryId: '',
    tagIds: [],
    authorId: '',
  });
  const [newCategory, setNewCategory] = useState<string>('');
  const [newTag, setNewTag] = useState<string>('');
  const [newAuthor, setNewAuthor] = useState<string>('');
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
  const [authors, setAuthors] = useState<{ id: number; name: string }[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, tagsRes, authorsRes] = await Promise.all([
          fetch('/api/categories').then(res => res.json()),
          fetch('/api/tags').then(res => res.json()),
          fetch('/api/authors').then(res => res.json()),
        ]);
        setCategories(categoriesRes.categories);
        setTags(tagsRes.tags);
        setAuthors(authorsRes.authors);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!formData.title || !formData.image || !formData.content || !formData.categoryId || !formData.authorId) {
      setError('All fields except tags are required');
      return;
    }

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: new Date().toISOString().split('T')[0],
        }),
      });

      if (response.ok) {
        router.push('/blog');
      } else {
        setError('Failed to save post');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      setError('Error saving post');
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory.trim() }),
      });
      if (response.ok) {
        const newCat = await response.json();
        setCategories([...categories, newCat]);
        setNewCategory('');
        setFormData({ ...formData, categoryId: newCat.id.toString() });
      }
    } catch (error) {
      console.error('Error adding category:', error);
      setError('Failed to add category');
    }
  };

  const handleAddTag = async () => {
    if (!newTag.trim()) return;
    try {
      const response = await fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTag.trim() }),
      });
      if (response.ok) {
        const newTagData = await response.json();
        setTags([...tags, newTagData]);
        setNewTag('');
        setFormData({ ...formData, tagIds: [...formData.tagIds, newTagData.id.toString()] });
      }
    } catch (error) {
      console.error('Error adding tag:', error);
      setError('Failed to add tag');
    }
  };

  const handleAddAuthor = async () => {
    if (!newAuthor.trim()) return;
    try {
      const response = await fetch('/api/authors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newAuthor.trim() }),
      });
      if (response.ok) {
        const newAuthorData = await response.json();
        setAuthors([...authors, newAuthorData]);
        setNewAuthor('');
        setFormData({ ...formData, authorId: newAuthorData.id.toString() });
      }
    } catch (error) {
      console.error('Error adding author:', error);
      setError('Failed to add author');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Create New Blog Post</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            rows={6}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              placeholder="New category..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          <select
            multiple
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.tagIds}
            onChange={(e) =>
              setFormData({
                ...formData,
                tagIds: Array.from(e.target.selectedOptions).map(opt => opt.value),
              })
            }
          >
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              placeholder="New tag..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.authorId}
            onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              placeholder="New author..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddAuthor}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Link href="/blog" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-danger rounded-md hover:bg-blue-700 transition"
          >
            Save Post
          </button>
        </div>
      </form>
    </div>
  );
}