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

	return (
		<div className="text-center">
			<h1 className="text-2xl lg:text-3xl font-bold text-white text-center">
				Account
			</h1>
			<p className="text-white mt-2">
				Logged in with email:{" "}
				<span className="font-bold underline">{user.email}</span>
			</p>
		</div>
	);
}
