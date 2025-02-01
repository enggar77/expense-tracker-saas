"use client";

import { deleteExpense } from "@/actions/actions";

export default function DeleteButton({ expenseId }: { expenseId: number }) {
	return (
		<button
			onClick={async () => {
				await deleteExpense(expenseId);
			}}
			className="h-5 w-5 text-[10px] bg-red-500 text-white rounded-full hover:bg-red-600"
		>
			X
		</button>
	);
}
