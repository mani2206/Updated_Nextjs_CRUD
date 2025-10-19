

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from '../../components/SearchBar';
import Filters from '../../components/Filters';
import PostGrid from '../../components/PostGrid';
import DeleteModal from '@/components/DeleteModal';
import { BlogPost, FilterOptions, filterAndSortPosts } from '../../lib/utils';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
  const [authors, setAuthors] = useState<{ id: number; name: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>('');
  const [sortValue, setSortValue] = useState<string>('date-desc');
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      try {
        const [postsRes, categoriesRes, tagsRes, authorsRes] = await Promise.all([
          fetch('/api/blogs').then(res => res.json()),
          fetch('/api/categories').then(res => res.json()),
          fetch('/api/tags').then(res => res.json()),
          fetch('/api/authors').then(res => res.json()),
        ]);
        setPosts(postsRes.posts);
        setCategories(categoriesRes.categories);
        setTags(tagsRes.tags);
        setAuthors(authorsRes.authors);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (postId: number) => {
    try {
      const response = await fetch(`/api/blogs?id=${postId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setPosts(posts.filter(post => post.id !== postId));
        setIsModalOpen(false);
        setPostToDelete(null);
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const openDeleteModal = (postId: number) => {
    setPostToDelete(postId);
    setIsModalOpen(true);
  };

  const filterOptions: FilterOptions = {
    searchTerm,
    selectedCategories,
    selectedTags,
    selectedAuthor,
    sortValue,
  };

  const filteredPosts = filterAndSortPosts(posts, filterOptions);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Blog Posts</h1>
      <div className="flex justify-end mb-4">
        <Link href="/blog/new" className="px-4 py-2 bg-primary text-danger rounded-md hover:bg-blue-700 transition">
          Create New Post
        </Link>
      </div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Filters
        categories={categories}
        tags={tags}
        authors={authors}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        selectedAuthor={selectedAuthor}
        setSelectedAuthor={setSelectedAuthor}
        sortValue={sortValue}
        setSortValue={setSortValue}
      />
      <PostGrid posts={filteredPosts} onDelete={openDeleteModal} />
      {isModalOpen && (
        <DeleteModal
          onConfirm={() => handleDelete(postToDelete!)}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
