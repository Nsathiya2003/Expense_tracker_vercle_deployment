import { useState } from "react";
import AddBudget from "./AddBudget";
import BudgetTable from "./BudgetTable";

export default function ViewBudget() {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="flex flex-col p-2">
      <AddBudget editingId={editingId} />
      <div className="-mt-2">
        <BudgetTable
          onEdit={(id) => {
            // Force a prop-change even if same id is clicked repeatedly:
            setEditingId(null);
            setTimeout(() => setEditingId(id), 0);
            // setOpenAdd(true);
          }}
        />
      </div>
    </div>
  );
}
