import Header from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<BackgroundPattern />
			<div className="flex flex-col gap-y-10 max-w-[1050px] mx-auto px-5 min-h-screen">
				<Header />
				{children}
			</div>
		</>
	);
}
