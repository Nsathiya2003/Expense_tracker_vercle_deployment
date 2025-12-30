// import { useState } from "react";
// import AddExpense from "./AddExpense";
// import ExpenseTable from "./expenseTable";
// import CurrentBalance from "../../component/current-balance";

// export default function ViewExpense() {
//   const [editingId, setEditingId] = useState<string | null>(null);

//   return (
//     <div className="flex flex-col p-2">
//       <CurrentBalance />
//       <AddExpense editingId={editingId} />
//       <div className="-mt-2">
//         <ExpenseTable
//           onEdit={(id) => {
//             // Force a prop-change even if same id is clicked repeatedly:
//             setEditingId(null);
//             setTimeout(() => setEditingId(id), 0);
//           }}
//         />
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import AddExpense from "./AddExpense";
import CurrentBalance from "../../component/current-balance";
import ExpenseTable from "./expenseTable";

export default function ViewExpense() {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="flex flex-col p-2">
      {/* Current Balance Card */}
      <CurrentBalance />

      {/* Add / Edit Expense Form */}
      <AddExpense editingId={editingId} />

      {/* Expense Table */}
      <div className="-mt-2">
        <ExpenseTable
          onEdit={(id) => {
            // Force update even if same id is clicked
            setEditingId(null);
            setTimeout(() => setEditingId(id), 0);
          }}
        />
      </div>
    </div>
  );
}
