"use server";

import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addExpense(formData: FormData) {
	const { isAuthenticated, getUser } = getKindeServerSession();
	if (!(await isAuthenticated())) {
		return redirect("/api/auth/login");
	}
	const user = await getUser();
	await prisma.expense.create({
		data: {
			description: formData.get("description") as string,
			amount: Number(formData.get("amount")),
			creatorId: user.id,
		},
	});

	revalidatePath("/app/dashboard");
}

export async function updateExpense(formData: FormData, id: number) {
	const { isAuthenticated } = getKindeServerSession();
	if (!(await isAuthenticated())) {
		return redirect("/api/auth/login");
	}

	await prisma.expense.update({
		where: {
			id: id,
		},
		data: {
			description: formData.get("description") as string,
			amount: Number(formData.get("amount")),
		},
	});
}

export async function deleteExpense(id: number) {
	const { isAuthenticated } = getKindeServerSession();
	if (!(await isAuthenticated())) {
		return redirect("/api/auth/login");
	}

	await prisma.expense.delete({
		where: {
			id: id,
		},
	});

	revalidatePath("/app/dashboard");
}
