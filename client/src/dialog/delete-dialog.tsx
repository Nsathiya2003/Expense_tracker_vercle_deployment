export const DeleteDialog = ({
  open,
  onClose,
  onDelete,
  deleteId,
}: {
  open: boolean;
  onClose: () => void;
  // onDelete should accept the id to delete; receives deleteId when user confirms
  onDelete: (id: string) => void;
  deleteId: string | null;
}) => {
  const handleDelete = () => {
    if (deleteId) onDelete(deleteId);
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-[#2d2d50] p-6 rounded-2xl w-[360px] shadow-lg border border-gray-600 animate-fadeIn">
            <p className="text-lg font-semibold mb-3 text-white">
              Confirm Delete
            </p>
            <p className="text-sm text-gray-300 mb-5">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-md bg-gray-600 hover:bg-gray-500 text-white text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-1.5 rounded-md bg-red-600 hover:bg-red-500 text-white text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
