import Loading from "./animations/Loading";

function PageLoading({ children }: { children: React.ReactNode }) {
	return (
		<div className="fixed inset-0 z-1000 flex h-full w-full flex-col items-center justify-center gap-3 bg-[rgba(0,0,0,0.9)] text-white">
			<Loading className="text-white" />
			<p className="ml-2 text-xl!">{children}</p>
		</div>
	);
}

export default PageLoading;
