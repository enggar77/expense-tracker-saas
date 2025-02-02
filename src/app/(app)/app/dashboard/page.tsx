import ExpensesForm from "@/components/expenses-form";
import ExpensesList from "@/components/expenses-list";
import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
	// authentication check
	const { isAuthenticated, getUser } = getKindeServerSession();
	if (!(await isAuthenticated())) {
		return redirect("/api/auth/login");
	}

	// authorization check
	const user = await getUser();
	const membership = await prisma.membership.findFirst({
		where: {
			userId: user.id,
		},
	});
	if (!membership || membership.status !== "active") return redirect("/");

	const expenses = await prisma.expense.findMany({
		where: {
			creatorId: user.id,
		},
	});

	// Check if user has any expenses data
	const hasNoExpenses = expenses.length === 0;

	return (
		<div className="">
			<h1 className="text-2xl lg:text-3xl font-bold text-white text-center">
				Dashboard
			</h1>

			<div className="w-full max-w-[600px] mx-auto">
				<ExpensesList expenses={expenses} noExpenses={hasNoExpenses} />

				<ExpensesForm />
			</div>
		</div>
	);
}
