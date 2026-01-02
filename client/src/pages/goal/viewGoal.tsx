import { useState } from "react";
import AddGoal from "./AddGoal";
import GoalTable from "./GoalTable";

export default function ViewGoal() {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="flex flex-col p-2">
      <AddGoal editingId={editingId} />
      <div className="-mt-2">
        <GoalTable
          onEdit={(id) => {
            // Force a prop-change even if same id is clicked repeatedly:
            setEditingId(null);
            setTimeout(() => setEditingId(id), 0);
          }}
        />
      </div>
    </div>
  );
}
