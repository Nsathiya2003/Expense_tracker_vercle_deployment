import * as Dialog from "@radix-ui/react-dialog";
import { FiX } from "react-icons/fi";

export default function FilterDialog({
  open,
  onClose,
  onApply,
  className,
  children,
}: {
  open: boolean;
  onClose: () => void;
  onApply?: () => void;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut" />

        {/* Content (same styling as your original) */}
        <Dialog.Content className={className}>
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-semibold">
              Filter Options
            </Dialog.Title>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* Dynamic Inserted Fields — your old UI replaced by children */}
          <div className="space-y-4">{children}</div>

          {/* Footer */}
          <div className="flex justify-end mt-6 gap-3">
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-lg text-sm"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                onApply?.();
              }}
              className="bg-[#54af54] hover:bg-[#6ecf6e] px-4 py-2 rounded-lg text-sm"
            >
              Apply
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
