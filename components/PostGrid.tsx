'use client';

import PostCard from './PostCard';
import { BlogPost } from '../lib/utils';

interface PostGridProps {
  posts: BlogPost[];
  onDelete: (postId: number) => void;
}

export default function PostGrid({ posts, onDelete }: PostGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} onDelete={onDelete} />)
      ) : (
        <p className="text-center text-gray-500 col-span-full">No posts found matching your criteria.</p>
      )}
    </div>
  );
}