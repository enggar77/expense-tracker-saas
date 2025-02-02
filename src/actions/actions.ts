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

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2025-01-27.acacia",
});

export async function createCheckoutSession() {
	const { isAuthenticated, getUser } = getKindeServerSession();
	if (!(await isAuthenticated())) {
		return redirect("/api/auth/login");
	}

	const user = await getUser();
	const session = await stripe.checkout.sessions.create({
		customer_email: user.email!,
		client_reference_id: user.id,
		line_items: [
			{
				price: "price_1QntGlREb2CugnS3Qy0cbXxp",
				quantity: 1,
			},
		],
		mode: "payment",
		success_url: "http://localhost:3000/app/dashboard",
		cancel_url: "http://localhost:3000",
	});

	redirect(session.url!);
}
