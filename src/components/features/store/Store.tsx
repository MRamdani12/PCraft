import Container from "../../ui/Container";
import Navigation from "../../ui/navigation/Navigation";
import Filter from "./filter/Filter";
import StoreCard from "./StoreCard";

import {
	useAppDispatch,
	useAppSelector,
} from "../../../utils/hooks/reduxHooks";
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

function Store() {
	const storeState = useAppSelector((state) => state.store);
	const accountState = useAppSelector((state) => state.account);
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();

	const query = searchParams.get("q") ?? "";
	const categoryParams = searchParams.getAll("category") ?? [];
	const sort: SortFilterType =
		(searchParams.get("sort") as SortFilterType) ?? "Default";
	const view: "grid" | "row" =
		(searchParams.get("view") as "grid" | "row") ?? "grid";

	const storeItemsLoading = Array.from({ length: 11 }, (_, i) => (
		<StoreCardLoading key={i} />
	));
	const storeItemsLongLoading = Array.from({ length: 11 }, (_, i) => (
		<StoreCardLongLoading key={i} />
	));
	const uniqueItemCategories = Array.from(
		new Map(storeState.items.map((i) => [i.category, i.category])).values(),
	);

	const processedStoreItems = storeState.items
		.filter((item) => {
			const matchesQuery =
				item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
			const matchesCategory =
				matchesQuery && categoryParams.includes(item.category);

			if (!categoryParams.length) return matchesQuery;

			return matchesQuery && matchesCategory;
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

	const storeCardStatusMap: Record<string, React.ReactNode> = {
		loading: storeItemsLoading,
		fulfilled: processedStoreItems.map((item) => (
			<StoreCard
				key={item.id}
				id={item.id}
				img={item.gallery[0].url}
				itemName={item.name}
				itemPrice={item.price}
				itemDescription={item.description.intro}
				itemStock={item.stock}
			/>
		)),
	};

	const storeCardLongStatusMap: Record<string, React.ReactNode> = {
		loading: storeItemsLongLoading,
		fulfilled: processedStoreItems.map((item) => (
			<StoreCardLong
				key={`long-${item.id}`}
				id={item.id}
				img={item.gallery[0].url}
				itemName={item.name}
				itemPrice={item.price}
				itemDescription={item.description.intro}
				itemStock={item.stock}
			/>
		)),
	};

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
						uniqueCategories={uniqueItemCategories}
						query={query}
						filterCategories={categoryParams}
						sort={sort}
						view={view}
					/>

					{processedStoreItems.length > 0 && (
						<>
							<div className="hidden pb-30 xl:block">
								<FadeInOut duration={50} show={view === "grid"}>
									<div className="relative grid w-full items-stretch justify-items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
										{storeCardStatusMap[storeState.status] ?? (
											<MessageBox className="absolute top-0 w-full py-20 text-2xl">
												{storeState.error}
											</MessageBox>
										)}
									</div>
								</FadeInOut>
								<FadeInOut duration={50} show={view === "row"}>
									<div className="flex w-full flex-col items-center justify-start gap-5">
										{storeCardLongStatusMap[storeState.status] ?? (
											<MessageBox className="absolute w-full py-20 text-2xl">
												{storeState.error}
											</MessageBox>
										)}
									</div>
								</FadeInOut>
							</div>
							<div className="pb-30 xl:hidden">
								<div className="relative grid w-full items-center justify-items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
									{storeCardStatusMap[storeState.status] ?? (
										<MessageBox className="absolute top-0 w-full py-20 text-2xl">
											{storeState.error}
										</MessageBox>
									)}
								</div>
							</div>
						</>
					)}

					{processedStoreItems.length === 0 &&
						storeState.status === "fulfilled" && (
							<MessageBox className="flex flex-col items-center justify-center gap-5 py-20">
								<p className="text-3xl!">No items found</p>
								<Button to="/store">RESET FILTER</Button>
							</MessageBox>
						)}
					{storeState.status === "error" && (
						<MessageBox className="mx-auto bg-white py-20">
							{storeState.error}
						</MessageBox>
					)}
				</Container>
			</div>
		</>
	);
}
export default Store;
