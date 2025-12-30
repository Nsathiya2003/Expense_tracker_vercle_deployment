import ViewBudget from "./budget/ViewBudget";

export default function Budget() {
  return (
    <main className="p-4 md:p-6 lg:p-8">
      <div className="max-w-[1200px] mx-auto">
        <ViewBudget />
      </div>
    </main>
  );
}
