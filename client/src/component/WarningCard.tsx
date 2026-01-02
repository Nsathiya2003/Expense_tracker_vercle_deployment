import { useState } from "react";
import { MdWarning, MdClose } from "react-icons/md";

type WarningCardProps = {
  category?: string;
  message?: string;
  onClose?: () => void;
};

export default function WarningCard({
  category = "",
  message = "",
  onClose,
}: WarningCardProps) {
  const [visible, setVisible] = useState(true);

  function handleClose() {
    setVisible(false);
    onClose?.();
  }

  if (!visible) return null;

  return (
    <div className="w-full max-w-[1200px] mx-auto mb-4">
      <div className="flex items-start gap-4 bg-gradient-to-r from-[#fff4e5] to-[#ffe6e6] border border-[#ffd6a5] text-[#5a3b00] p-4 rounded-lg shadow">
        <div className="mt-0.5 text-2xl">
          <MdWarning />
        </div>

        <div className="flex-1">
          <div className="font-semibold">
            Budget Alert{category ? `: ${category}` : ""}
          </div>
          <div className="text-sm opacity-90">
            {message ||
              "You are approaching or have exceeded your budget for this category."}
          </div>
        </div>

        <button
          onClick={handleClose}
          className="text-[#5a3b00] hover:text-[#2c2c2c]"
        >
          <MdClose size={20} />
        </button>
      </div>
    </div>
  );
}
