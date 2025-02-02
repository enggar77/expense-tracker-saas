"use client";

import { createCheckoutSession } from "@/actions/actions";

export default function PurchaseBtn() {
	return (
		<button
			className="bg-black text-white py-2 px-4 rounded-lg font-medium mt-10 inline-block"
			onClick={async () => await createCheckoutSession()}
		>
			Go to payment
		</button>
	);
}
