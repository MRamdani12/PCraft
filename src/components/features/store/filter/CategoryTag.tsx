function CategoryTag({
	children,
	onDelete,
}: {
	children: React.ReactNode;
	onDelete: () => void;
}) {
	return (
		<div className="flex items-center justify-between gap-7 rounded-[3px] bg-black px-3 py-1 font-medium text-white">
			<span>{children}</span>{" "}
			<button onClick={onDelete} className="cursor-pointer p-1">
				<svg
					width="8"
					height="9"
					viewBox="0 0 8 9"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1.92188 0L3.62695 3.04102L5.33789 0H7.18945L4.6582 4.23047L7.25391 8.53125H5.38477L3.62695 5.43164L1.875 8.53125H0L2.5957 4.23047L0.0644531 0H1.92188Z"
						fill="currentColor"
					/>
				</svg>
			</button>
		</div>
	);
}

export default CategoryTag;
