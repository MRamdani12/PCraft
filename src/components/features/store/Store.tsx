import { useEffect, useMemo, useState } from "react";
import {
	useAppDispatch,
	useAppSelector,
} from "../../../utils/hooks/reduxHooks";
import type { StoreItemType } from "./utils/types/StoreItemsType";

import Container from "../../ui/Container";
import Navigation from "../../ui/navigation/Navigation";
import Filter from "./filter/Filter";
import StoreCard from "./StoreCard";
import MessageBox from "../../ui/MessageBox";
import StoreCardLoading from "./StoreCardLoading";
import StoreCardLong from "./StoreCardLong";
import StoreCardLongLoading from "./StoreCardLongLoading";
import { useSearchParams } from "react-router";
import type { SortFilterType } from "./utils/types/SortFilterType";
import FloatingError from "../../ui/FloatingError";
import { deleteError } from "../accounts/AccountSlice";
import FadeInOut from "../../ui/animations/FadeInOut";
import GlobalCartButton from "../accounts/cart/GlobalCartButton";
import Button from "../../ui/buttons/Button";
import { getStoreItems } from "../../../utils/services/apiServices";
import type { StoreItemResponseType } from "./utils/types/StoreItemsResponseType";
import Loading from "../../ui/animations/Loading";

import type { StoreCategoriesType } from "./utils/types/StoreCategoriesType";

const FETCH_ITEMS_LIMIT = 8;

function Store() {
	const [storeItems, setStoreItems] = useState<StoreItemType[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
	const [error, setError] = useState("");
	const [nextCursor, setNextCursor] = useState<number | null>(null);
	const accountState = useAppSelector((state) => state.account);
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();

	const query = searchParams.get("q") ?? "";

	const categoryParams = useMemo(() => {
		return (searchParams.getAll("category") as StoreCategoriesType) ?? [];
	}, [searchParams]);

	const sort: SortFilterType =
		(searchParams.get("sort") as SortFilterType) ?? "Default";

	const view: "grid" | "row" =
		(searchParams.get("view") as "grid" | "row") ?? "grid";

	const storeItemsLongLoading = Array.from({ length: 11 }, (_, i) => (
		<StoreCardLongLoading key={i} />
	));

	const itemCategories: StoreCategoriesType = [
		"VGA",
		"RAM",
		"Motherboard",
		"CPU",
		"PSU",
		"Cooler",
	];

	const processedStoreItems = storeItems
		.filter((item) => {
			const matchesQuery =
				item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;

			if (!categoryParams.length) return matchesQuery;

			return matchesQuery;
		})
		// Note: sort mutate array, this is safe because filter copy the previous array into a new one
		.sort((a, b) => {
			switch (sort) {
				case "Default":
					return 0;
				case "Highest Price":
					return b.price - a.price;
				case "Lowest Price":
					return a.price - b.price;
				case "Oldest":
					return (
						new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
					);
				case "Newest":
					return (
						new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
					);
				default:
					return 0;
			}
		});

	async function handleLoadMore() {
		async function fetchStoreItems() {
			setIsLoadMoreLoading(true);
			try {
				const data: StoreItemResponseType = await getStoreItems(
					FETCH_ITEMS_LIMIT,
					nextCursor,
					categoryParams,
					sort,
					query,
				);
				setStoreItems((items) => {
					return [...items, ...data.items];
				});
				if (data.nextCursor) {
					setNextCursor(data.nextCursor);
				} else {
					setNextCursor(null);
				}
				setIsLoadMoreLoading(false);
			} catch (error) {
				console.error(error);
				setIsLoadMoreLoading(false);
				setError(String(error));
			}
		}
		fetchStoreItems();
	}

	useEffect(() => {
		async function fetchStoreItems() {
			setIsLoading(true);
			try {
				const data: StoreItemResponseType = await getStoreItems(
					FETCH_ITEMS_LIMIT,
					null,
					categoryParams,
					sort,
					query,
				);
				setStoreItems(data.items);

				setNextCursor(data.nextCursor);

				setIsLoading(false);
			} catch (error) {
				console.error(error);
				setIsLoading(false);
				setError(String(error));
			}
		}
		fetchStoreItems();

		// Disabled es lint here since this effect is just for the initial load.
	}, [categoryParams, query, sort]);

	return (
		<>
			<Navigation />
			{accountState.error && (
				<FloatingError
					deleteErrorFn={() => dispatch(deleteError())}
					error={accountState.error}
				/>
			)}

			<GlobalCartButton />

			<div className="pt-30">
				<Container>
					<Filter
						itemCategories={itemCategories}
						filterCategories={categoryParams}
						sort={sort}
						view={view}
					/>

					{error ? (
						<MessageBox className="flex flex-col items-center justify-center gap-5 py-20">
							{error}
						</MessageBox>
					) : (
						<>
							<FadeInOut duration={50} show={view === "grid"}>
								<div className="relative grid w-full items-stretch justify-items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
									{isLoading &&
										Array.from({ length: 11 }, (_, i) => (
											<StoreCardLoading key={i} />
										))}
									{!isLoading &&
										processedStoreItems.map((item) => (
											<StoreCard
												key={item.id}
												id={item.id}
												img={item.gallery[0].url}
												itemName={item.name}
												itemPrice={item.price}
												itemDescription={item.description.intro}
												itemStock={item.stock}
											/>
										))}
								</div>
							</FadeInOut>
							<div className="hidden xl:block">
								<FadeInOut duration={50} show={view === "row"}>
									<div className="flex w-full flex-col items-center justify-start gap-5">
										{isLoading && storeItemsLongLoading}
										{!isLoading &&
											processedStoreItems.map((item) => (
												<StoreCardLong
													key={`long-${item.id}`}
													id={item.id}
													img={item.gallery[0].url}
													itemName={item.name}
													itemPrice={item.price}
													itemDescription={item.description.intro}
													itemStock={item.stock}
												/>
											))}
									</div>
								</FadeInOut>
							</div>
							{processedStoreItems.length === 0 && !isLoading && (
								<MessageBox className="flex flex-col items-center justify-center gap-5 py-20">
									<p className="text-3xl!">No items found</p>
									<Button to="/store">RESET FILTER</Button>
								</MessageBox>
							)}
							<div className="flex items-center justify-center py-10">
								{nextCursor && processedStoreItems.length !== 0 && (
									<Button
										onClick={handleLoadMore}
										className="flex h-13 w-[20%] items-center justify-center"
									>
										{isLoadMoreLoading ? <Loading /> : "LOAD MORE ITEMS"}
									</Button>
								)}
							</div>
						</>
					)}
				</Container>
			</div>
		</>
	);
}
export default Store;
