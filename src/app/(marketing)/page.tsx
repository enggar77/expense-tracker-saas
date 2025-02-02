import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import PurchaseBtn from "@/components/purchase-btn";

export default async function Home() {
	const { isAuthenticated, getUser } = getKindeServerSession();
	const user = await getUser();
	const isLoggedIn = await isAuthenticated();
	const membership = await prisma.membership.findFirst({
		where: {
			userId: user.id,
		},
	});

	return (
		<div className="bg-[#5dc9a8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10 p-5 xl:px-16 mx-auto">
			<Image
				src="https://bytegrad.com/course-assets/youtube/expensestracker/preview.png"
				alt="Expenses Tracker app preview"
				width={700}
				height={472}
				className="rounded-md"
			/>

			<div className="max-w-[700px]">
				<h1 className="text-4xl md:text-5xl font-semibold my-6">
					Track your <span className="font-extrabold">expenses</span>{" "}
					with ease
				</h1>

				<p className="text-xl md:text-2xl font-medium">
					Use Expenses Tracker to easily keep track of your expenses.
					Get lifetime access for $99.
				</p>

				{isLoggedIn && membership && membership.status === "active" ? (
					<Link
						href="/app/dashboard"
						className="bg-black text-white py-2 px-4 rounded-lg font-medium mt-10 inline-block"
					>
						Go to Dashboard
					</Link>
				) : isLoggedIn && !membership ? (
					<PurchaseBtn />
				) : (
					<div className="mt-10 space-x-3">
						<RegisterLink className="bg-black text-white py-2 px-4 rounded-lg font-medium">
							Register
						</RegisterLink>
						<LoginLink className="bg-black/50 text-white py-2 px-4 rounded-lg font-medium">
							Login
						</LoginLink>
					</div>
				)}
			</div>
		</div>
	);
}
