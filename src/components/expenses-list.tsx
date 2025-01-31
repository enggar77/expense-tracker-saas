export default function ExpensesList() {
	const expenses = [{ id: 1, description: "Hookers", amount: "200" }];
	return (
		<ul className="h-[300px] bg-white rounded mt-4 shadow-md">
			{expenses.map((expense) => (
				<li key={expense.id} className="flex items-center px-4 py-2 border-b">
					<p>{expense.description}</p>
					<p className="ml-auto font-bold mr-4">${expense.amount}</p>
					<button className="h-5 w-5 text-[10px] bg-red-500 text-white rounded-full hover:bg-red-600">
						X
					</button>
				</li>
			))}
		</ul>
	);
}
