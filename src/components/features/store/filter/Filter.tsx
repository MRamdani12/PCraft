import { useSearchParams } from "react-router";
import type { SortFilterType } from "../utils/types/SortFilterType";
import { useEffect, useState } from "react";

import ViewButton from "./ViewButton";
import CategoryTag from "./CategoryTag";
import ButtonLink from "../../../ui/buttons/ButtonLink";

type FilterProps = {
	itemCategories: string[];

	filterCategories: string[];
	sort: SortFilterType;
	view: "grid" | "row";
};

function Filter({ itemCategories, filterCategories, sort, view }: FilterProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchInput, setSearchInput] = useState("");
	const filterBorder = "rounded-xs border border-[rgba(0,0,0,0.3)]";
	const sortArray: SortFilterType[] = [
		"Default",
		"Highest Price",
		"Lowest Price",
		"Oldest",
		"Newest",
	];

	function handleSearchFilters(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchInput(e.target.value);
	}

	// Effect for the search filter
	useEffect(() => {
		const timeout = setTimeout(() => {
			const params = new URLSearchParams(searchParams);

			if (searchInput) {
				params.set("q", searchInput);
			} else {
				params.delete("q");
			}

			setSearchParams(params);
		}, 300);

		return () => clearTimeout(timeout);
	}, [searchInput]);

	function handleCategoryFilters(
		event: React.ChangeEvent<HTMLInputElement>,
		newCategory: string,
	) {
		const params = new URLSearchParams(searchParams);
		if (event.target.checked) {
			params.append("category", newCategory.toLocaleLowerCase());
			setSearchParams(params);
		} else {
			params.delete("category", newCategory.toLocaleLowerCase());
			setSearchParams(params);
		}
	}

	function handleSort(sortType: SortFilterType) {
		const params = new URLSearchParams(searchParams);
		params.set("sort", sortType);
		setSearchParams(params);
	}

	function handleViewChange(e: React.FormEvent, view: "grid" | "row") {
		e.preventDefault();
		const params = new URLSearchParams(searchParams);
		params.set("view", view);
		setSearchParams(params);
	}

	return (
		<div className="mb-10 flex flex-col items-start justify-between gap-5">
			<form className="w-full">
				<div className="grid grid-cols-1 grid-rows-2 gap-5 xl:grid-cols-[3fr_1fr_1fr_1fr_1.5fr_1.5fr_0.75fr] xl:grid-rows-1">
					<div
						className={`${filterBorder} relative flex h-full w-full items-center justify-between gap-2 border px-4 py-2 xl:col-span-4`}
					>
						<input
							className="h-full w-full focus:outline-0"
							placeholder="Search..."
							type="text"
							value={searchInput}
							onChange={handleSearchFilters}
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
								stroke="currentColor"
								strokeOpacity="0.5"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
					<div
						className={`${filterBorder} group relative flex items-center justify-start px-4`}
					>
						<div className="flex w-full items-center justify-between">
							<span>Category</span>
							<span>
								<svg
									className="transition-all duration-350 group-hover:-rotate-x-180"
									width="9"
									height="8"
									viewBox="0 0 9 8"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M3.59979 7.5C3.98469 8.16667 4.94695 8.16667 5.33185 7.5L8.79595 1.5C9.18085 0.833334 8.69972 0 7.92992 0H1.00172C0.231919 0 -0.249207 0.833333 0.135694 1.5L3.59979 7.5Z"
										fill="black"
									/>
								</svg>
							</span>
						</div>
						<div className="absolute top-10 left-0 z-100 h-0 w-full overflow-clip border-0 border-black bg-white transition-all duration-100 group-hover:h-60 group-hover:border">
							<ul className="flex flex-col items-start justify-start">
								{itemCategories.map((c) => (
									<li
										key={c}
										className={`relative w-full cursor-pointer px-4 py-2 transition-all duration-200 hover:translate-x-2 ${filterCategories.includes(c.toLocaleLowerCase()) ? "bg-black text-white" : "bg-white text-black"}`}
									>
										<label htmlFor={c}>{c}</label>
										<input
											className="absolute inset-0 z-100 cursor-pointer opacity-0"
											onChange={(e) => handleCategoryFilters(e, c)}
											type="checkbox"
											name={c}
											checked={filterCategories.includes(c.toLocaleLowerCase())}
										/>
									</li>
								))}
							</ul>
						</div>
					</div>
					<div
						className={`${filterBorder} group relative flex items-center justify-start px-4 py-2`}
					>
						<div className="flex w-full items-center justify-between">
							<span>Sort By: {sort}</span>
							<span>
								<svg
									className="transition-all duration-350 group-hover:-rotate-x-180"
									width="9"
									height="8"
									viewBox="0 0 9 8"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M3.59979 7.5C3.98469 8.16667 4.94695 8.16667 5.33185 7.5L8.79595 1.5C9.18085 0.833334 8.69972 0 7.92992 0H1.00172C0.231919 0 -0.249207 0.833333 0.135694 1.5L3.59979 7.5Z"
										fill="black"
									/>
								</svg>
							</span>
						</div>
						<div className="absolute top-10 left-0 z-100 h-0 w-full overflow-clip border-0 border-black bg-white transition-all duration-100 group-hover:h-50 group-hover:border">
							<ul className="flex flex-col items-start justify-start">
								{sortArray.map((s) => {
									return (
										<li
											key={s}
											className={`relative w-full cursor-pointer px-4 py-2 transition-all duration-200 hover:translate-x-2 ${sort === s ? "bg-black text-white" : "bg-white text-black"}`}
										>
											<label htmlFor={s}>{s}</label>
											<input
												className="absolute inset-0 cursor-pointer opacity-0"
												name="sort"
												value={s}
												type="radio"
												onChange={(e) =>
													handleSort(e.target.value as SortFilterType)
												}
											/>
										</li>
									);
								})}
							</ul>
						</div>
					</div>
					<div className="hidden items-center justify-center xl:flex">
						<ViewButton
							onClick={(e) => handleViewChange(e, "grid")}
							className={
								view === "grid" ? "bg-black text-white" : "bg-white text-black"
							}
						>
							<svg
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect
									width="8.12903"
									height="8.12903"
									rx="1"
									fill="currentColor"
								/>
								<rect
									x="9.87109"
									width="8.12903"
									height="8.12903"
									rx="1"
									fill="currentColor"
								/>
								<rect
									x="9.87109"
									y="9.87109"
									width="8.12903"
									height="8.12903"
									rx="1"
									fill="currentColor"
								/>
								<rect
									y="9.87109"
									width="8.12903"
									height="8.12903"
									rx="1"
									fill="currentColor"
								/>
							</svg>
						</ViewButton>
						<ViewButton
							onClick={(e) => handleViewChange(e, "row")}
							className={
								view === "row" ? "bg-black text-white" : "bg-white text-black"
							}
						>
							<svg
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect width="18" height="5.00918" rx="1" fill="currentColor" />
								<rect
									y="6.49561"
									width="18"
									height="5.00918"
									rx="1"
									fill="currentColor"
								/>
								<rect
									y="12.9907"
									width="18"
									height="5.00918"
									rx="1"
									fill="currentColor"
								/>
							</svg>
						</ViewButton>
					</div>
				</div>
			</form>
			<div className="flex w-full gap-5">
				{filterCategories.length ? (
					<>
						<ul className="flex items-center gap-3">
							{filterCategories.map((c, i) => {
								return (
									<li key={i}>
										<CategoryTag
											onDelete={() => {
												const params = new URLSearchParams(searchParams);
												params.delete("category", c);
												setSearchParams(params);
											}}
										>
											{c}
										</CategoryTag>
									</li>
								);
							})}
						</ul>
						<ButtonLink
							onClick={() => {
								const params = new URLSearchParams(searchParams);
								params.delete("category");
								setSearchParams(params);
							}}
						>
							Clear Category
						</ButtonLink>
					</>
				) : null}
			</div>
		</div>
	);
}

export default Filter;
