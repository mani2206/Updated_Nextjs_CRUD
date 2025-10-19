// 'use client';

// interface DeleteModalProps {
//   onConfirm: () => void;
//   onCancel: () => void;
// }

// export default function DeleteModal({ onConfirm, onCancel }: DeleteModalProps) {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
//         <p className="text-gray-600 mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
//         <div className="flex justify-end gap-4">
//           <button
//             onClick={onCancel}
//             className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// components/DeleteModal.tsx
interface DeleteModalProps {
  onConfirm: () => void; // or () => Promise<void> if it's async
  onCancel: () => void;
  isLoading: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm, onCancel, isLoading }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
      <p className="mb-6">Are you sure you want to delete this post?</p>
      <div className="flex justify-end space-x-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          disabled={isLoading}
        >
          {isLoading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;