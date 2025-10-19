// export interface BlogPost {
//   id: number;
//   title: string;
//   excerpt: string;
//   content: string;
//   tags: string[];
//   categories: string[];
//   author: string;
//   authorName: string;
//   date: string;
//   image: string;
// }

// interface FilterOptions {
//   searchTerm: string;
//   selectedCategories: string[];
//   selectedTags: string[];
//   selectedAuthor: string;
//   sortValue: string;
// }

// export function filterAndSortPosts(posts: BlogPost[], options: FilterOptions): BlogPost[] {
//   const { searchTerm, selectedCategories, selectedTags, selectedAuthor, sortValue } = options;

//   return posts
//     .filter((post) => {
//       // Search filter
//       const matchesSearch =
//         post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

//       // Category filter
//       const matchesCategory =
//         selectedCategories.length === 0 ||
//         selectedCategories.some((cat) =>
//           post.categories.some((pcat) => pcat.toLowerCase() === cat.toLowerCase())
//         );

//       // Tags filter
//       const matchesTags =
//         selectedTags.length === 0 ||
//         selectedTags.some((tag) => post.tags.some((ptag) => ptag.toLowerCase() === tag.toLowerCase()));

//       // Author filter
//       const matchesAuthor = !selectedAuthor || post.author.toLowerCase() === selectedAuthor.toLowerCase();

//       return matchesSearch && matchesCategory && matchesTags && matchesAuthor;
//     })
//     .sort((a, b) => {
//       if (sortValue === 'date-desc') {
//         return new Date(b.date).getTime() - new Date(a.date).getTime();
//       } else if (sortValue === 'date-asc') {
//         return new Date(a.date).getTime() - new Date(b.date).getTime();
//       } else if (sortValue === 'title-asc') {
//         return a.title.localeCompare(b.title);
//       } else if (sortValue === 'title-desc') {
//         return b.title.localeCompare(a.title);
//       }
//       return 0;
//     });
// }


// export interface BlogPost {
//   id: number;
//   title: string;
//   image: string;
//   content: string;
//   categoryId: number;
//   tagIds: number[];
//   authorId: number;
//   date: string;
//   category?: { id: number; name: string };
//   tags: { id: number; name: string }[];
//   author: { id: number; name: string };
// }

// export interface FilterOptions {
//   searchTerm: string;
//   selectedCategories: string[];
//   selectedTags: string[];
//   selectedAuthor: string;
//   sortValue: string;
// }

// export function filterAndSortPosts(posts: BlogPost[], options: FilterOptions): BlogPost[] {
//   const { searchTerm, selectedCategories, selectedTags, selectedAuthor, sortValue } = options;

//   return posts
//     .filter((post) => {
//       // Search filter
//       const matchesSearch =
//         post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         post.content.toLowerCase().includes(searchTerm.toLowerCase());

//       // Category filter
//       const matchesCategory =
//         selectedCategories.length === 0 ||
//         selectedCategories.includes(post.categoryId.toString());

//       // Tags filter
//       const matchesTags =
//         selectedTags.length === 0 ||
//         selectedTags.some((tagId) => post.tagIds.includes(parseInt(tagId)));

//       // Author filter
//       const matchesAuthor =
//         !selectedAuthor || post.authorId.toString() === selectedAuthor;

//       return matchesSearch && matchesCategory && matchesTags && matchesAuthor;
//     })
//     .sort((a, b) => {
//       if (sortValue === 'date-desc') {
//         return new Date(b.date).getTime() - new Date(a.date).getTime();
//       } else if (sortValue === 'date-asc') {
//         return new Date(a.date).getTime() - new Date(b.date).getTime();
//       } else if (sortValue === 'title-asc') {
//         return a.title.localeCompare(b.title);
//       } else if (sortValue === 'title-desc') {
//         return b.title.localeCompare(a.title);
//       }
//       return 0;
//     });
// }


export interface BlogPost {
  id: number;
  title: string;
  image: string;
  content: string;
  categoryId: number;
  tagIds: number[];
  authorId: number;
  date: string;
  category?: { id: number; name: string };
  tags: { id: number; name: string }[];
  author: { id: number; name: string };
}

export interface FilterOptions {
  searchTerm: string;
  selectedCategories: string[];
  selectedTags: string[];
  selectedAuthor: string;
  sortValue: string;
}

// export function filterAndSortPosts(posts: BlogPost[], options: FilterOptions): BlogPost[] {
//   const { searchTerm, selectedCategories, selectedTags, selectedAuthor, sortValue } = options;

//   return posts
//     .filter((post) => {
//       // Search filter
//       const matchesSearch =
//         post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         post.content.toLowerCase().includes(searchTerm.toLowerCase());

//       // Category filter
//       const matchesCategory =
//         selectedCategories.length === 0 ||
//         selectedCategories.includes(post.categoryId.toString());

//       // Tags filter
//       const matchesTags =
//         selectedTags.length === 0 ||
//         selectedTags.some((tagId) => post.tagIds.includes(parseInt(tagId)));

//       // Author filter
//       const matchesAuthor =
//         !selectedAuthor || post.authorId.toString() === selectedAuthor;

//       return matchesSearch && matchesCategory && matchesTags && matchesAuthor;
//     })
//     .sort((a, b) => {
//       if (sortValue === 'date-desc') {
//         return new Date(b.date).getTime() - new Date(a.date).getTime();
//       } else if (sortValue === 'date-asc') {
//         return new Date(a.date).getTime() - new Date(b.date).getTime();
//       } else if (sortValue === 'title-asc') {
//         return a.title.localeCompare(b.title);
//       } else if (sortValue === 'title-desc') {
//         return b.title.localeCompare(a.title);
//       }
//       return 0;
//     });
// }

export function filterAndSortPosts(
  posts: BlogPost[] | undefined,
  options: FilterOptions
): BlogPost[] {
  if (!Array.isArray(posts)) {
    console.warn("filterAndSortPosts: posts is not an array", posts);
    return [];
  }

  const {
    searchTerm = "",
    selectedCategories = [],
    selectedTags = [],
    selectedAuthor = "",
    sortValue = "date-desc",
  } = options;

  return posts
    .filter((post) => {
      // Search filter
      const matchesSearch =
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(post.categoryId?.toString());

      // Tags filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tagId) =>
          post.tagIds?.includes(parseInt(tagId))
        );

      // Author filter
      const matchesAuthor =
        !selectedAuthor || post.authorId?.toString() === selectedAuthor;

      return matchesSearch && matchesCategory && matchesTags && matchesAuthor;
    })
    .sort((a, b) => {
      if (sortValue === "date-desc") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortValue === "date-asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortValue === "title-asc") {
        return a.title.localeCompare(b.title);
      } else if (sortValue === "title-desc") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });
}



