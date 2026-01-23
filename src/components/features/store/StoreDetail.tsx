// Utils Import
import { useNavigate, useParams } from "react-router";
import {
	useAppDispatch,
	useAppSelector,
} from "../../../utils/hooks/reduxHooks";
import { useRef, useState } from "react";
import {
	addCartItemQuantity,
	addToCart,
	deleteCartItem,
	substractCartItemQuantity,
} from "../accounts/AccountSlice";

// UI Import
import ReturnNav from "../../ui/navigation/ReturnNav";
import Container from "../../ui/Container";
import BackgroundBarAlternate from "../../ui/backgrounds/BackgroundBarAlternate";
import Navigation from "../../ui/navigation/Navigation";
import StoreCard from "./StoreCard";
import Button from "../../ui/Button";
import expandImg from "../../../assets/icons/expand.svg";
import ButtonSkewed from "../../ui/ButtonSkewed";
import MessageBox from "../../ui/MessageBox";
import BackgroundLogo from "../../ui/backgrounds/BackgroundLogo";
import Modal from "../../ui/Modal";
import GlobalCartButton from "../accounts/cart/GlobalCartButton";
import FadeInOut from "../../ui/animations/FadeInOut";
import Loading from "../../ui/animations/Loading";

function StoreDetail() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const storeState = useAppSelector((state) => state.store);
	const AccountStateCart = useAppSelector((state) => state.account.cart);
	const dispatch = useAppDispatch();
	const params = useParams();
	const [activeImg, setActiveImg] = useState(0);
	const bigImgContainerRef = useRef<HTMLDivElement | null>(null);
	const bigImgRef = useRef<HTMLImageElement | null>(null);
	const navigate = useNavigate();

	const storeItem = storeState.items.find((i) => i.id === Number(params.id));

	const isInCart = AccountStateCart.some(
		(item) => item.itemId === Number(params.id),
	);

	const storeCartItemQuantity = AccountStateCart.find(
		(item) => item.itemId === Number(params.id),
	);

	function handleMagnifyImg(e: React.MouseEvent) {
		if (!bigImgContainerRef.current || !bigImgRef.current) return;

		const bigImgContainer = bigImgContainerRef.current;
		const x = e.clientX;
		const y = e.clientY;
		const containerX = x - bigImgContainer.getBoundingClientRect().x;
		const containerY = y - bigImgContainer.getBoundingClientRect().y;

		bigImgRef.current.style.transformOrigin = `${containerX}px ${containerY}px`;
		bigImgRef.current.style.transform = "scale(2)";
	}

	function handleMouseLeave() {
		if (!bigImgRef.current) return;

		bigImgRef.current.style.transformOrigin = "center";
		bigImgRef.current.style.transform = "scale(1)";
	}

	function handleAddToCart() {
		if (!storeItem) return;

		const newCartItem = {
			itemId: storeItem.id,
			itemName: storeItem.name,
			itemStock: storeItem.stock,
			itemQuantity: 1,
			itemPrice: storeItem.price,
			itemImage: storeItem.gallery[0].url,
		};
		dispatch(addToCart(newCartItem));
	}

	return (
		<>
			<Navigation />
			{storeState.status === "loading" && (
				<div className="flex h-dvh w-dvw flex-col items-center justify-center gap-3">
					<Loading />
					<p className="ml-1">Loading item...</p>
				</div>
			)}
			{storeState.status === "error" && (
				<div className="flex h-dvh items-center justify-center">
					<MessageBox className="mx-auto max-w-[90%] py-20">
						{storeState.error}
					</MessageBox>
				</div>
			)}
			{storeState.status === "fulfilled" && storeItem && (
				<FadeInOut show={true}>
					<GlobalCartButton />
					<Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
						<div className="z-100 flex h-full max-h-[80%] w-full max-w-[90%] flex-col items-center justify-center gap-5 xl:max-w-[60%] xl:items-stretch xl:justify-stretch">
							<div className="relative flex max-h-150 w-full items-center justify-center overflow-clip rounded-xs border border-[rgba(0,0,0,0.2)] bg-white xl:h-full">
								<img
									className="h-full"
									src={storeItem.gallery[activeImg].url}
									alt={storeItem.gallery[activeImg].label}
								/>
							</div>
							<div className="z-50 flex items-start justify-start gap-5 overflow-x-auto overflow-y-hidden pb-5">
								{storeItem.gallery.map((i, index) => {
									return (
										<button
											key={i.url}
											onClick={() => setActiveImg(index)}
											className="flex h-full max-h-100 w-full max-w-50 shrink-0 cursor-pointer items-center justify-center border border-[rgba(0,0,0,0.2)] bg-white"
										>
											<img className="h-full" src={i.url} alt={i.label} />
										</button>
									);
								})}
							</div>
						</div>
					</Modal>

					<div className="relative overflow-clip pt-30">
						<BackgroundLogo className="absolute top-[30%] -z-1 mx-auto ml-10 w-full opacity-5" />
						<BackgroundBarAlternate className="absolute top-0 left-0 hidden 2xl:block" />
						<Container>
							<div className="top-0 mb-10 flex w-full items-center">
								<ReturnNav
									to="/store"
									className="relative z-100 flex items-center justify-start gap-2 xl:text-black"
								>
									Go back
								</ReturnNav>
							</div>

							{storeState.status === "fulfilled" && (
								<div className="justify-between gap-20 xl:flex">
									<div className="relative mb-10 flex items-start xl:mb-0 xl:w-[50%]">
										<div className="sticky top-5 flex w-full flex-col gap-5">
											<button
												onClick={() => {
													setIsModalOpen(true);
												}}
												className="absolute top-5 right-5 z-50 flex h-15 w-15 cursor-pointer items-center justify-center overflow-clip rounded-full border border-[rgba(0,0,0,0.2)] p-4 transition duration-200 hover:scale-110"
											>
												<img
													className="h-full w-full"
													src={expandImg}
													alt="expand"
												/>
											</button>
											<div
												onMouseMove={handleMagnifyImg}
												onMouseLeave={handleMouseLeave}
												ref={bigImgContainerRef}
												className="relative flex h-full max-h-80.5 w-full cursor-zoom-in items-center justify-center overflow-clip rounded-xs border border-[rgba(0,0,0,0.2)] bg-white py-50"
											>
												<img
													className="h-full max-h-80.5 rounded-sm"
													ref={bigImgRef}
													src={storeItem.gallery[activeImg].url}
													alt={storeItem.gallery[activeImg].label}
												/>
											</div>
											<div className="flex items-center justify-start gap-5 overflow-x-auto pb-5">
												{storeItem.gallery.map((i, index) => {
													return (
														<button
															key={index}
															onClick={() => setActiveImg(index)}
															className="flex h-full max-h-20 w-full max-w-50 shrink-0 cursor-pointer items-center justify-center border border-[rgba(0,0,0,0.2)] bg-white"
														>
															<img
																className="h-full max-h-20 rounded-xs"
																src={i.url}
																alt={i.label}
															/>
														</button>
													);
												})}
											</div>
										</div>
									</div>
									<div className="xl:w-[50%]">
										<h1>{storeItem.name}</h1>
										<p className="mb-10">{storeItem.description.intro}</p>
										<div className="mb-10 grid gap-5 xl:grid-cols-2">
											{storeItem.description.features.map((i, index) => {
												return (
													<div
														key={index}
														className="flex flex-col items-start justify-start rounded-xs border border-[rgba(0,0,0,0.2)] bg-white p-5"
													>
														<h2 className="mb-2 text-2xl! font-bold!">
															{i.name}
														</h2>
														<p className="opacity-70">{i.description}</p>
													</div>
												);
											})}
										</div>
										<div className="flex items-center justify-between py-2">
											<p>Available Stock: {storeItem.stock}</p>
											{storeCartItemQuantity && (
												<div className="flex gap-5">
													<button
														onClick={() =>
															dispatch(
																substractCartItemQuantity({
																	itemId: storeItem.id,
																	quantity: 1,
																}),
															)
														}
														className="flex cursor-pointer items-center justify-center rounded-xs border border-black bg-black px-3 py-0 pb-px text-white transition duration-200 hover:bg-white hover:text-black"
													>
														-
													</button>
													{storeCartItemQuantity.itemQuantity}
													<button
														onClick={() => {
															if (
																storeCartItemQuantity.itemQuantity >=
																storeItem.stock
															)
																return;
															dispatch(
																addCartItemQuantity({
																	itemId: storeItem.id,
																	quantity: 1,
																}),
															);
														}}
														className="flex cursor-pointer items-center justify-center rounded-xs border border-black bg-black px-2.25 py-0 pb-px text-white transition duration-200 hover:bg-white hover:text-black"
													>
														+
													</button>
												</div>
											)}
										</div>
										{storeItem.stock > 0 && isInCart && (
											<>
												<div className="flex w-full items-center justify-between gap-1">
													<ButtonSkewed className="w-[49%]" to="/cart">
														PURCHASE NOW
													</ButtonSkewed>
													<ButtonSkewed
														className="w-[51%] text-red-500"
														shapeColor="oklch(63.7% 0.237 25.331)"
														alternate={true}
														onClick={() =>
															dispatch(deleteCartItem({ id: storeItem.id }))
														}
													>
														DELETE ITEM
													</ButtonSkewed>
												</div>
												<p className="mt-2">Item is in your cart</p>
											</>
										)}
										{storeItem.stock > 0 && !isInCart && (
											<div className="flex w-full items-center justify-between gap-1">
												<ButtonSkewed
													className="w-[49%]"
													onClick={() => {
														handleAddToCart();
														navigate("/cart");
													}}
												>
													PURCHASE
												</ButtonSkewed>
												<ButtonSkewed
													className="w-[51%]"
													alternate={true}
													onClick={handleAddToCart}
												>
													ADD TO CART
												</ButtonSkewed>
											</div>
										)}
										{storeItem.stock === 0 && (
											<MessageBox className="h-10 w-full bg-white">
												SOLD OUT
											</MessageBox>
										)}
									</div>
								</div>
							)}
							<div className="my-20 flex flex-col gap-10">
								<h2>Item with the same category</h2>
								<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
									{storeState.items
										.filter((i) => i.category === storeItem.category)
										// Note: sort mutate array, this is safe because filter copy the previous array into a new one
										.sort(
											(a, b) =>
												new Date(a.created_at).getTime() -
												new Date(b.created_at).getTime(),
										)
										.slice(0, 4)
										.map((item) => {
											return (
												<StoreCard
													key={item.id}
													id={item.id}
													img={item.gallery[0].url}
													itemName={item.name}
													itemPrice={item.price}
													itemDescription={item.description.intro}
													itemStock={item.stock}
												/>
											);
										})}
								</div>
								<div className="flex justify-end">
									<Button to="/store">SEE ALL ITEMS</Button>
								</div>
							</div>
						</Container>
					</div>
				</FadeInOut>
			)}
		</>
	);
}

export default StoreDetail;
