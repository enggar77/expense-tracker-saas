import ExpensesForm from "@/components/expenses-form";
import ExpensesList from "@/components/expenses-list";

export default function page() {
	return (
		<div className="">
			<h1 className="text-2xl lg:text-3xl font-bold text-white text-center">Dashboard</h1>

			<div className="w-full max-w-[600px] mx-auto">
				<ExpensesList />

				<ExpensesForm />
			</div>
		</div>
	);
}
