import { useState } from "react";

import {
	deleteOrder,
	getAccountOrders,
} from "../../../../utils/services/apiServices";
import {
	useLoaderData,
	useNavigation,
	useRevalidator,
	type LoaderFunctionArgs,
} from "react-router";
import { useAppSelector } from "../../../../utils/hooks/reduxHooks";

import type { OrderItemResponseType } from "../utils/types/OrderItemResponseType";

import Container from "../../../ui/Container";
import MessageBox from "../../../ui/MessageBox";
import Navigation from "../../../ui/navigation/Navigation";
import Button from "../../../ui/buttons/Button";
import Order from "./Order";
import Modal from "../../../ui/Modal";
import Loading from "../../../ui/animations/Loading";
import GlobalCartButton from "../cart/GlobalCartButton";

type OrderSortType = "Newest" | "Oldest";

function OrderHistory() {
	const [query, setQuery] = useState<string>("");
	const [sort, setSort] = useState<OrderSortType>("Newest");
	const [isPaymentLoading, setIsPaymentLoading] = useState(false);
	const [deleteOrderId, setDeleteOrderId] = useState("");
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const accountName = useAppSelector((state) => state.account.userName);
	const navigation = useNavigation();
	const revalidator = useRevalidator();

	const sortArray: OrderSortType[] = ["Newest", "Oldest"];
	const filterBorder = "rounded-xs border border-[rgba(0,0,0,0.3)]";

	const orders = useLoaderData<OrderItemResponseType[]>();

	function handleSort(sortType: OrderSortType) {
		setSort(sortType);
	}

	function handleDeleteModalOpen(orderId: string) {
		setIsDeleteModalOpen(true);
		setDeleteOrderId(orderId);
	}

	async function handleDeleteOrder() {
		await deleteOrder(deleteOrderId);

		setIsDeleteModalOpen(false);
		setDeleteOrderId("");
		await revalidator.revalidate();
	}

	return (
		<>
			<GlobalCartButton />
			{navigation.state === "idle" && (
				<>
					<Modal isOpen={isPaymentLoading}>
						<Loading className="text-white" />
					</Modal>
					<Modal
						isOpen={isDeleteModalOpen}
						closeModal={() => setIsDeleteModalOpen(false)}
					>
						<MessageBox className="z-100 mx-auto flex max-w-[70%] flex-col items-center justify-center gap-5 bg-white py-30 text-center">
							<h2>You sure you want to remove this order?</h2>
							<div className="flex gap-5">
								<Button
									onClick={handleDeleteOrder}
									className="border-red-500 bg-red-500 hover:text-red-500"
								>
									DELETE ORDER
								</Button>
								<Button onClick={() => setIsDeleteModalOpen(false)}>
									CANCEL
								</Button>
							</div>
						</MessageBox>
					</Modal>
					<Navigation />
					{orders.length === 0 && (
						<div className="px-30 py-30">
							<Container>
								<MessageBox className="flex flex-col items-center justify-center border-[rgba(0,0,0,0.3)]! px-5 py-30 text-center">
									<h1 className="mb-1 text-[32px]!">
										Hi {accountName}, you haven't ordered any item yet
									</h1>
									<p className="mb-5 text-xl! opacity-60">
										Start ordering some!
									</p>
									<Button to="/store">VISIT STORE</Button>
								</MessageBox>
							</Container>
						</div>
					)}
					{orders.length > 0 && (
						<div className="py-30">
							<Container>
								<MessageBox className="flex flex-col items-center justify-center gap-5 border-[rgba(0,0,0,0.3)]! px-5 py-30 text-center">
									<h1>
										Hi {accountName}, you can see all your order histories here
									</h1>
									<p className="max-w-300">
										Note that the Stripe integration is a test mode, you can use
										4242 4242 4242 4242 as a card number with any email, date,
										CVC number, cardholder name, and country to pay for the
										item. Also, the order here will be deleted after three days
										and will change status (starting after paying) every 30
										minutes.
									</p>
									<p className="max-w-300">
										Keep in mind that with how the server works, order status
										after paying for the item won't be updated immediately every
										30 minutes.
									</p>
								</MessageBox>
								<p className="mt-5 mb-2">
									Enter your order ID or the name of the item(s) you ordered
								</p>
								<div className="flex gap-2">
									<div className="w-[80%]">
										<div
											className={`${filterBorder} relative flex h-full w-full items-center justify-between gap-2 border px-4 py-2 xl:col-span-4`}
										>
											<input
												className="h-full w-full focus:outline-0"
												placeholder="Search Order..."
												type="text"
												value={query}
												onChange={(e) => setQuery(e.target.value)}
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
									</div>
									<div
										className={`${filterBorder} group relative flex w-[20%] items-center justify-start px-4 py-2`}
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
										<div className="absolute top-10 left-0 z-100 h-0 w-full overflow-clip border-0 border-black bg-white transition-all duration-100 group-hover:h-20 group-hover:border">
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
																	handleSort(e.target.value as OrderSortType)
																}
															/>
														</li>
													);
												})}
											</ul>
										</div>
									</div>
								</div>

								{navigation.state === "idle" && (
									<div className="mt-5">
										{orders.length === 0 && (
											<MessageBox className="flex flex-col items-center justify-center gap-6 py-20">
												<h2 className="text-2xl!">
													You haven't ordered any items yet, start ordering
													some!
												</h2>
												<Button to="/store">VISIT STORE</Button>
											</MessageBox>
										)}
										{orders.length > 0 && (
											<>
												<ul className="flex flex-col gap-20">
													{orders
														.filter((order) => {
															if (!query) return true;
															return (
																order.id
																	.toLowerCase()
																	.indexOf(query.toLowerCase()) !== -1 ||
																order.items.find(
																	(item) =>
																		item.itemName
																			.toLowerCase()
																			.indexOf(query.toLowerCase()) !== -1,
																)
															);
														})
														.sort((a, b) => {
															if (sort === "Newest") {
																return (
																	new Date(b.created_at).getTime() -
																	new Date(a.created_at).getTime()
																);
															} else {
																return (
																	new Date(a.created_at).getTime() -
																	new Date(b.created_at).getTime()
																);
															}
														})
														.map((order) => {
															return (
																<Order
																	key={order.id}
																	order={order}
																	setIsPaymentLoading={setIsPaymentLoading}
																	handleDeleteModalOpen={handleDeleteModalOpen}
																/>
															);
														})}
												</ul>
											</>
										)}
									</div>
								)}
							</Container>
						</div>
					)}
				</>
			)}
		</>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }: LoaderFunctionArgs) {
	if (!params.accountId) return;
	try {
		const accountOrders = await getAccountOrders(params.accountId);
		return accountOrders;
	} catch (error) {
		console.error(error);
	}
}

export default OrderHistory;
