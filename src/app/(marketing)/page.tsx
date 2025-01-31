import Image from "next/image";

export default function Home() {
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
					Track your <span className="font-extrabold">expenses</span> with ease
				</h1>

				<p className="text-xl md:text-2xl font-medium">
					Use Expenses Tracker to easily keep track of your expenses. Get lifetime access for $99.
				</p>
			</div>

			<div></div>
		</div>
	);
}
