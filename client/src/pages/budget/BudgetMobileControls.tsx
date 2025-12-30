interface Props {
  page: number;
  totalPages: number;
  search: string;
  limit: number;
  onSearch: (value: string) => void;
  onPrev: () => void;
  onNext: () => void;
  onLimitChange: (limit: number) => void;
}

export default function BudgetMobileControls({
  page,
  totalPages,
  search,
  limit,
  onSearch,
  onPrev,
  onNext,
  onLimitChange,
}: Props) {
  return (
    <div className="md:hidden space-y-3 mb-4">
      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search budgets..."
        className="
          w-full h-11 px-4
          rounded-xl
          bg-[#1f1f2e]
          border border-gray-700
          text-sm text-white
          placeholder:text-gray-400
        "
      />

      {/* Pagination + Limit */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={onPrev}
          disabled={page <= 1}
          className="
            px-4 py-2 rounded-lg
            bg-[#26263a] border border-gray-700
            text-sm text-white
            disabled:opacity-40
          "
        >
          Prev
        </button>

        <span className="text-xs text-gray-400 whitespace-nowrap">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={onNext}
          disabled={page >= totalPages}
          className="
            px-4 py-2 rounded-lg
            bg-[#26263a] border border-gray-700
            text-sm text-white
            disabled:opacity-40
          "
        >
          Next
        </button>
      </div>

      {/* Records Per Page */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Records per page</span>

        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="
            h-9 px-3
            rounded-lg
            bg-[#26263a]
            border border-gray-700
            text-sm text-white
          "
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
}
