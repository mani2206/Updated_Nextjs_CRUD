// "use client";

// import { Dispatch, SetStateAction } from "react";

// interface FiltersProps {
//   categories: { id: number; name: string }[];
//   tags: { id: number; name: string }[];
//   authors: { id: number; name: string }[];
//   selectedCategories: string[];
//   setSelectedCategories: Dispatch<SetStateAction<string[]>>;
//   selectedTags: string[];
//   setSelectedTags: Dispatch<SetStateAction<string[]>>;
//   selectedAuthor: string;
//   setSelectedAuthor: Dispatch<SetStateAction<string>>;
//   sortValue: string;
//   setSortValue: Dispatch<SetStateAction<string>>;
// }

// export default function Filters({
//   categories = [],
//   tags = [],
//   authors = [],
//   selectedCategories,
//   setSelectedCategories,
//   selectedTags,
//   setSelectedTags,
//   selectedAuthor,
//   setSelectedAuthor,
//   sortValue,
//   setSortValue,
// }: FiltersProps) {
//   const handleMultiSelectChange = (
//     e: React.ChangeEvent<HTMLSelectElement>,
//     setState: Dispatch<SetStateAction<string[]>>
//   ) => {
//     const options = Array.from(e.target.selectedOptions).map(
//       (option) => option.value
//     );
//     setState(options);
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         {/* Category Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Categories
//           </label>
//           <select
//             multiple
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//             value={selectedCategories}
//             onChange={(e) => handleMultiSelectChange(e, setSelectedCategories)}
//           >
//             {categories.map((category) => (
//               <option key={category.id} value={category.id.toString()}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Tags Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Tags
//           </label>
//           <select
//             multiple
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//             value={selectedTags}
//             onChange={(e) => handleMultiSelectChange(e, setSelectedTags)}
//           >
//             {tags.map((tag) => (
//               <option key={tag.id} value={tag.id.toString()}>
//                 {tag.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Author Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Author
//           </label>
//           <select
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//             value={selectedAuthor}
//             onChange={(e) => setSelectedAuthor(e.target.value)}
//           >
//             <option value="">All Authors</option>
//             {authors.map((author) => (
//               <option key={author.id} value={author.id.toString()}>
//                 {author.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Sort Filter */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Sort By
//           </label>
//           <select
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//             value={sortValue}
//             onChange={(e) => setSortValue(e.target.value)}
//           >
//             <option value="date-desc">Date (Newest First)</option>
//             <option value="date-asc">Date (Oldest First)</option>
//             <option value="title-asc">Alphabetical (A-Z)</option>
//             <option value="title-desc">Alphabetical (Z-A)</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }

//second one 

// "use client";

// import { Dispatch, SetStateAction } from "react";
// import { ChevronDown, Filter } from "lucide-react";

// interface FiltersProps {
//   categories: { id: number; name: string }[];
//   tags: { id: number; name: string }[];
//   authors: { id: number; name: string }[];
//   selectedCategories: string[];
//   setSelectedCategories: Dispatch<SetStateAction<string[]>>;
//   selectedTags: string[];
//   setSelectedTags: Dispatch<SetStateAction<string[]>>;
//   selectedAuthor: string;
//   setSelectedAuthor: Dispatch<SetStateAction<string>>;
//   sortValue: string;
//   setSortValue: Dispatch<SetStateAction<string>>;
// }

// export default function Filters({
//   categories = [],
//   tags = [],
//   authors = [],
//   selectedCategories,
//   setSelectedCategories,
//   selectedTags,
//   setSelectedTags,
//   selectedAuthor,
//   setSelectedAuthor,
//   sortValue,
//   setSortValue,
// }: FiltersProps) {
//   const handleMultiSelectChange = (
//     e: React.ChangeEvent<HTMLSelectElement>,
//     setState: Dispatch<SetStateAction<string[]>>
//   ) => {
//     const options = Array.from(e.target.selectedOptions).map(
//       (option) => option.value
//     );
//     setState(options);
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md mb-6 animate-fade-in-up stagger-2">
//       <div className="flex items-center mb-4">
//         <Filter className="w-5 h-5 mr-2 text-gray-600" />
//         <h2 className="text-lg font-semibold text-gray-800">Filter Posts</h2>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         {/* Category Filter */}
//         <div className="relative animate-slide-in-right stagger-1">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Categories
//           </label>
//           <div className="relative">
//             <select
//               multiple
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition-all-smooth hover:shadow-md"
//               value={selectedCategories}
//               onChange={(e) => handleMultiSelectChange(e, setSelectedCategories)}
//             >
//               {categories.map((category) => (
//                 <option key={category.id} value={category.id.toString()}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//             <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
//           </div>
//         </div>

//         {/* Tags Filter */}
//         <div className="relative animate-slide-in-right stagger-2">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Tags
//           </label>
//           <div className="relative">
//             <select
//               multiple
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition-all-smooth hover:shadow-md"
//               value={selectedTags}
//               onChange={(e) => handleMultiSelectChange(e, setSelectedTags)}
//             >
//               {tags.map((tag) => (
//                 <option key={tag.id} value={tag.id.toString()}>
//                   {tag.name}
//                 </option>
//               ))}
//             </select>
//             <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
//           </div>
//         </div>

//         {/* Author Filter */}
//         <div className="relative animate-slide-in-right stagger-3">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Author
//           </label>
//           <div className="relative">
//             <select
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition-all-smooth hover:shadow-md"
//               value={selectedAuthor}
//               onChange={(e) => setSelectedAuthor(e.target.value)}
//             >
//               <option value="">All Authors</option>
//               {authors.map((author) => (
//                 <option key={author.id} value={author.id.toString()}>
//                   {author.name}
//                 </option>
//               ))}
//             </select>
//             <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
//           </div>
//         </div>

//         {/* Sort Filter */}
//         <div className="relative animate-slide-in-right stagger-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Sort By
//           </label>
//           <div className="relative">
//             <select
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition-all-smooth hover:shadow-md"
//               value={sortValue}
//               onChange={(e) => setSortValue(e.target.value)}
//             >
//               <option value="date-desc">Date (Newest First)</option>
//               <option value="date-asc">Date (Oldest First)</option>
//               <option value="title-asc">Alphabetical (A-Z)</option>
//               <option value="title-desc">Alphabetical (Z-A)</option>
//             </select>
//             <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { Dispatch, SetStateAction } from "react";
import { ChevronDown, Filter } from "lucide-react";

interface FiltersProps {
  categories: { id: number; name: string }[];
  tags: { id: number; name: string }[];
  authors: { id: number; name: string }[];
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
  selectedTags: string[];
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
  selectedAuthor: string;
  setSelectedAuthor: Dispatch<SetStateAction<string>>;
  sortValue: string;
  setSortValue: Dispatch<SetStateAction<string>>;
}

export default function Filters({
  categories = [],
  tags = [],
  authors = [],
  selectedCategories,
  setSelectedCategories,
  selectedTags,
  setSelectedTags,
  selectedAuthor,
  setSelectedAuthor,
  sortValue,
  setSortValue,
}: FiltersProps) {
  const handleMultiSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setState: Dispatch<SetStateAction<string[]>>
  ) => {
    const options = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setState(options);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 animate-fade-in-up stagger-2">
      <style>{`
        select[multiple] {
          height: 120px; /* Set a fixed height to show multiple options */
          overflow-y: auto; /* Enable scrolling for many options */
          padding: 8px; /* Ensure padding for better appearance */
          background-color: white; /* Ensure background is visible */
        }
        select[multiple] option {
          padding: 4px 8px; /* Add padding to options for better clickability */
        }
        select[multiple] option:checked {
          background-color: #3b82f6; /* Blue background for selected options */
          color: white; /* White text for selected options */
        }
        .dropdown-container {
          position: relative;
        }
      `}</style>
      <div className="flex items-center mb-4">
        <Filter className="w-5 h-5 mr-2 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Filter Posts</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div className="dropdown-container animate-slide-in-right stagger-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categories
          </label>
          <div className="relative">
            <select
              multiple
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all-smooth hover:shadow-md"
              value={selectedCategories}
              onChange={(e) => handleMultiSelectChange(e, setSelectedCategories)}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id.toString()}>
                  {category.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Hold Ctrl/Cmd to select multiple options
          </p>
        </div>

        {/* Tags Filter */}
        <div className="dropdown-container animate-slide-in-right stagger-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="relative">
            <select
              multiple
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all-smooth hover:shadow-md"
              value={selectedTags}
              onChange={(e) => handleMultiSelectChange(e, setSelectedTags)}
            >
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id.toString()}>
                  {tag.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Hold Ctrl/Cmd to select multiple options
          </p>
        </div>

        {/* Author Filter */}
        <div className="relative animate-slide-in-right stagger-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Author
          </label>
          <div className="relative">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition-all-smooth hover:shadow-md"
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
            >
              <option value="">All Authors</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id.toString()}>
                  {author.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Sort Filter */}
        <div className="relative animate-slide-in-right stagger-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <div className="relative">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition-all-smooth hover:shadow-md"
              value={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
            >
              <option value="date-desc">Date (Newest First)</option>
              <option value="date-asc">Date (Oldest First)</option>
              <option value="title-asc">Alphabetical (A-Z)</option>
              <option value="title-desc">Alphabetical (Z-A)</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}