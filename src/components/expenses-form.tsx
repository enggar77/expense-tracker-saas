import { addExpense } from "@/actions/actions";

export default function ExpensesForm() {
	return (
		<form action={addExpense} className="w-full mt-8 rounded overflow-hidden text-sm">
			<input type="text" placeholder="Description" name="description" className="w-full px-3 py-3 outline-none" />
			<input type="number" placeholder="Amount" name="amount" className="w-full px-3 py-3 pb-4 outline-none" />
			<button className="w-full bg-blue-500 text-white p-2 font-bold text-sm">Add Expense</button>
		</form>
	);
}
