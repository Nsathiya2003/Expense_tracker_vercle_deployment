import { useState, useRef, useEffect } from "react";

type Option = { value: string; label: string };

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder,
  id,
}: {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  id?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative" ref={ref}>
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="w-full h-11 px-4 rounded-lg border border-gray-600 bg-[rgba(255,255,255,0.03)] text-white text-sm text-left flex items-center justify-between"
      >
        <span className={`truncate ${selected ? "" : "text-gray-400"}`}>
          {selected ? selected.label : placeholder || "Select"}
        </span>
        <span className="text-gray-300">▾</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-activedescendant={selected?.value}
          className="absolute z-50 mt-2 w-full max-h-56 overflow-auto rounded-md bg-[#2E2E48] border border-gray-700 shadow-lg p-1"
        >
          {options.map((o) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className={`px-3 py-2 rounded hover:bg-[rgba(255,255,255,0.03)] cursor-pointer text-sm ${
                o.value === value
                  ? "bg-[rgba(84,175,84,0.12)] text-white"
                  : "text-gray-200"
              }`}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
