
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import SearchBar from '@/components/SearchBar';
// import Filters from '@/components/Filters';
// import PostGrid from '@/components/PostGrid';
// import DeleteModal from '@/components/DeleteModal';
// import {BlogPost,filterAndSortPosts,FilterOptions} from "../lib/utils"

// export default function BlogPage() {
//   const [posts, setPosts] = useState<BlogPost[]>([]);
//   const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
//   const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
//   const [authors, setAuthors] = useState<{ id: number; name: string }[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedTags, setSelectedTags] = useState<string[]>([]);
//   const [selectedAuthor, setSelectedAuthor] = useState<string>('');
//   const [sortValue, setSortValue] = useState<string>('date-desc');
//   const [postToDelete, setPostToDelete] = useState<number | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

//   useEffect(() => {
//     // Fetch initial data
//     const fetchData = async () => {
//       try {
//         const [postsRes, categoriesRes, tagsRes, authorsRes] = await Promise.all([
//           fetch('/api/blogs').then(res => res.json()),
//           fetch('/api/categories').then(res => res.json()),
//           fetch('/api/tags').then(res => res.json()),
//           fetch('/api/authors').then(res => res.json()),
//         ]);
//         setPosts(postsRes.posts);
//         setCategories(categoriesRes.categories);
//         setTags(tagsRes.tags);
//         setAuthors(authorsRes.authors);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleDelete = async (postId: number) => {
//     try {
//       const response = await fetch(`/api/blogs?id=${postId}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         setPosts(posts.filter(post => post.id !== postId));
//         setIsModalOpen(false);
//         setPostToDelete(null);
//       } else {
//         console.error('Failed to delete post');
//       }
//     } catch (error) {
//       console.error('Error deleting post:', error);
//     }
//   };

//   const openDeleteModal = (postId: number) => {
//     setPostToDelete(postId);
//     setIsModalOpen(true);
//   };

//   const filterOptions: FilterOptions = {
//     searchTerm,
//     selectedCategories,
//     selectedTags,
//     selectedAuthor,
//     sortValue,
//   };

//   const filteredPosts = filterAndSortPosts(posts, filterOptions);

//   return (
//     <div className="container mx-auto px-4">
//       <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Blog Posts</h1>
//       <div className="flex justify-end mb-4">
//         <Link href="/blog/new" className=" px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition">
//           Create New Post
//         </Link>
//       </div>
//       <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//       <Filters
//         categories={categories}
//         tags={tags}
//         authors={authors}
//         selectedCategories={selectedCategories}
//         setSelectedCategories={setSelectedCategories}
//         selectedTags={selectedTags}
//         setSelectedTags={setSelectedTags}
//         selectedAuthor={selectedAuthor}
//         setSelectedAuthor={setSelectedAuthor}
//         sortValue={sortValue}
//         setSortValue={setSortValue}
//       />
//       <PostGrid posts={filteredPosts} onDelete={openDeleteModal} />
//       {isModalOpen && (
//         <DeleteModal
//           onConfirm={() => handleDelete(postToDelete!)}
//           onCancel={() => setIsModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import Filters from '@/components/Filters';
import PostGrid from '@/components/PostGrid';
import DeleteModal from '@/components/DeleteModal';
import {BlogPost,filterAndSortPosts,FilterOptions} from "../lib/utils"

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

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
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (postId: number) => {
    setIsDeleting(true);
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
    } finally {
      setIsDeleting(false);
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
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.5s ease-out;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .transition-all-smooth {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
      `}</style>

      <div className="animate-fade-in-down">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Blog Posts
        </h1>
      </div>

      <div className="flex justify-end mb-6 animate-slide-in-right">
        <Link 
          href="/blog/new" 
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all-smooth hover:shadow-lg hover:scale-105 font-medium"
        >
          + Create New Post
        </Link>
      </div>

      <div className="animate-fade-in-up stagger-1">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="animate-fade-in-up stagger-2">
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
      </div>

      <div className="animate-fade-in-up stagger-3">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <PostGrid posts={filteredPosts} onDelete={openDeleteModal} />
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No posts found. Try adjusting your filters.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in-down">
          <div className="animate-fade-in-up">
            <DeleteModal
              onConfirm={() => handleDelete(postToDelete!)}
              onCancel={() => setIsModalOpen(false)}
              isLoading={isDeleting}
            />
          </div>
        </div>
      )}
    </div>
  );
}