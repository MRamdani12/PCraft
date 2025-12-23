function Filter() {
	const filterBorder = "rounded-xs border border-[rgba(0,0,0,0.3)]";

	return (
		<form>
			<div className="grid grid-cols-[1fr_1fr_1fr_1fr_1.5fr_1.5fr_0.75fr] gap-5">
				<div
					className={`${filterBorder} relative col-span-4 flex h-full w-full items-center justify-between gap-2 border px-4 py-2`}
				>
					<input
						className="h-full w-full focus:outline-0"
						placeholder="Search..."
						type="text"
					/>
					<svg
						width="17"
						height="17"
						viewBox="0 0 17 17"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11.6629 11.6759L16 16M13.5 7.25C13.5 10.7017 10.7017 13.5 7.25 13.5C3.79822 13.5 1 10.7017 1 7.25C1 3.79822 3.79822 1 7.25 1C10.7017 1 13.5 3.79822 13.5 7.25Z"
							stroke="black"
							stroke-opacity="0.5"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<div
					className={`${filterBorder} flex items-center justify-start px-4 py-2`}
				>
					Category
				</div>
				<div className={`${filterBorder}`}>
					<select className="h-full w-full px-4 py-2" name="" id="">
						<option value="">A-Z</option>
						<option value="">Z-A</option>
						<option value="">Lowest Price</option>
						<option value="">Highest Price</option>
					</select>
				</div>
				<div className={`${filterBorder}`}></div>
			</div>
		</form>
	);
}

export default Filter;
