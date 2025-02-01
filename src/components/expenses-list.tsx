import DeleteButton from "./button-delete";

type ExpensesListProps = {
	expenses: {
		id: number;
		description: string;
		amount: number;
		createdAt: Date;
	}[];
};

export default function ExpensesList({ expenses }: ExpensesListProps) {
	return (
		<ul className="h-[300px] bg-white rounded mt-4 shadow-md">
			{expenses.map((expense) => (
				<li key={expense.id} className="flex items-center px-4 py-2 border-b">
					<p>{expense.description}</p>
					<p className="ml-auto font-bold mr-4">${expense.amount}</p>
					<DeleteButton expenseId={expense.id} />
				</li>
			))}
		</ul>
	);
}
