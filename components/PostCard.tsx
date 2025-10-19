
// 'use client';

// import { BlogPost } from '../lib/utils';

// interface PostCardProps {
//   post: BlogPost;
//   onDelete: (postId: number) => void;
// }

// export default function PostCard({ post, onDelete }: PostCardProps) {
//   const getExcerpt = (content: string) => {
//     const words = content.split(' ');
//     return words.slice(0, 30).join(' ') + (words.length > 30 ? '...' : '');
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//       <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
//       <div className="p-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
//         <p className="text-gray-600 mb-4">{getExcerpt(post.content)}</p>
//         <div className="flex flex-wrap gap-2 mb-4">
//           {post.category ? (
//             <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{post.category.name}</span>
//           ) : null}
//         </div>
//         <div className="flex flex-wrap gap-2 mb-4">
//           {post.tags.map((tag) => (
//             <span key={tag.id} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
//               {tag.name}
//             </span>
//           ))}
//         </div>
//         <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
//           <span>By {post.author.name}</span>
//           <span>{new Date(post.date).toLocaleDateString()}</span>
//         </div>
//         <button
//           onClick={() => onDelete(post.id)}
//           className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }



'use client';

import { BlogPost } from '../lib/utils';
import { useState } from 'react';

interface PostCardProps {
  post: BlogPost;
  onDelete: (postId: number) => void;
}

export default function PostCard({ post, onDelete }: PostCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const getExcerpt = (content: string) => {
    const words = content.split(' ');
    return words.slice(0, 30).join(' ') + (words.length > 30 ? '...' : '');
  };

  const handleDelete = () => {
    setIsDeleting(true);
    // Add a small delay to show the animation before actually deleting
    setTimeout(() => {
      onDelete(post.id);
    }, 300);
  };

  return (
    <div className={`
      bg-white rounded-lg shadow-md overflow-hidden 
      transform transition-all duration-300 ease-out
      hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
      ${isDeleting ? 'opacity-0 scale-95 -translate-y-2' : 'opacity-100 scale-100 translate-y-0'}
      group cursor-pointer
    `}>
      <div className="relative overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
          {post.title}
        </h2>
        
        <p className="text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
          {getExcerpt(post.content)}
        </p>
        
        {post.category && (
          <div className="flex flex-wrap gap-2 animate-fade-in">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium transform transition-all duration-200 hover:scale-105 hover:bg-blue-200">
              {post.category.name}
            </span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 animate-fade-in-delayed">
          {post.tags.map((tag, index) => (
            <span 
              key={tag.id} 
              className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-medium transform transition-all duration-200 hover:scale-105 hover:bg-gray-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {tag.name}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4 transition-colors duration-300">
          <span className="font-medium hover:text-gray-700 transition-colors duration-200">
            By {post.author.name}
          </span>
          <span className="bg-gray-50 px-2 py-1 rounded text-xs">
            {new Date(post.date).toLocaleDateString()}
          </span>
        </div>
        
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`
            w-full px-4 py-2 rounded-md font-medium text-white
            transform transition-all duration-200 ease-out
            ${isDeleting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-red-500 hover:bg-red-600 hover:scale-105 active:scale-95 hover:shadow-lg'
            }
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
          `}
        >
          {isDeleting ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Deleting...
            </span>
          ) : (
            'Delete'
          )}
        </button>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-fade-in-delayed {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}