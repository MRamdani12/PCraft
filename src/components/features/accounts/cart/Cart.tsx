import { useEffect } from "react";
import {
	Form,
	Link,
	useActionData,
	useNavigate,
	useNavigation,
	type ActionFunctionArgs,
} from "react-router";
import {
	useAppDispatch,
	useAppSelector,
} from "../../../../utils/hooks/reduxHooks";
import {
	addCartItemQuantity,
	clearCart,
	deleteCartItem,
	deleteError,
	fetchAddress,
	substractCartItemQuantity,
} from "../AccountSlice";

import { addNewOrder } from "../../../../utils/services/apiServices";

import type { OrderItemType } from "../utils/types/OrderItemType";

import BackgroundBarAlternateStroke from "../../../ui/backgrounds/BackgroundBarAlternateStroke";
import Button from "../../../ui/buttons/Button";
import Navigation from "../../../ui/navigation/Navigation";
import MessageBox from "../../../ui/MessageBox";
import FloatingError from "../../../ui/FloatingError";
import Loading from "../../../ui/animations/Loading";
import PageLoading from "../../../ui/PageLoading";
import FadeInOut from "../../../ui/animations/FadeInOut";

type FormOrderType = {
	name: string;
	email: string;
	phoneNumber: string;
	address: string;
	accountId: string;
	cart: string;
};

function Cart() {
	const cart = useAppSelector((state) => state.account.cart);
	const accountState = useAppSelector((state) => state.account);
	const dispatch = useAppDispatch();
	const navigation = useNavigation();
	const navigate = useNavigate();
	const actionData = useActionData();
	const isLoading = navigation.state === "submitting";

	const inputContainerClass = "flex flex-col gap-2";
	const inputClass = "rounded-xs border border-[rgba(0,0,0,0.8)] px-3 py-2";

	useEffect(() => {
		if (actionData?.success) {
			dispatch(clearCart());
			navigate(`/order-history/${accountState.id}`);
		}
	}, [accountState.id, actionData, dispatch, navigate]);

	function handleGeolocation(e: React.FormEvent) {
		e.preventDefault();
		dispatch(fetchAddress());
	}

	return (
		<>
			<FadeInOut show={isLoading}>
				<PageLoading>Please Wait...</PageLoading>
			</FadeInOut>
			<Navigation />
			{accountState.status === "error" && (
				<FloatingError
					deleteErrorFn={() => dispatch(deleteError())}
					error={accountState.error}
				/>
			)}
			{cart.length === 0 && (
				<div className="flex h-dvh w-dvw items-center justify-center">
					<MessageBox className="mx-auto flex max-w-[70%] flex-col py-20">
						<h1 className="mb-2">Your cart is still empty</h1>
						<p className="mb-7">Add some items to your cart first</p>
						<Button to="/store">GO TO STORE</Button>
					</MessageBox>
				</div>
			)}
			{cart.length && (
				<div className="relative flex min-h-dvh flex-col-reverse gap-20 overflow-hidden px-5 py-30 xl:flex-row xl:px-30">
					<BackgroundBarAlternateStroke className="absolute -top-10 left-0 hidden xl:block" />

					{/* Form */}
					<Form method="POST" className="xl:w-[50%]">
						<h1 className="text-center sm:text-start">
							Enter your information
						</h1>
						<div className="mt-5 mb-10 flex flex-col gap-5">
							<div className={inputContainerClass}>
								<label htmlFor="email">Email</label>
								<input
									className={inputClass}
									name="email"
									defaultValue={accountState.email}
									type="text"
									placeholder="Enter your email..."
									required
								/>
							</div>
							<div className={inputContainerClass}>
								<label htmlFor="name">Name</label>
								<input
									className={inputClass}
									name="name"
									defaultValue={accountState.userName}
									type="text"
									placeholder="Enter your name..."
									required
								/>
							</div>
							<div className={inputContainerClass}>
								<label htmlFor="phoneNumber">Phone number</label>
								<input
									className={inputClass}
									name="phoneNumber"
									type="tel"
									inputMode="tel"
									autoComplete="tel"
									placeholder="Enter your phone number..."
									required
								/>
							</div>
							<div className={`${inputContainerClass} relative`}>
								<label htmlFor="Address">Address</label>
								<textarea
									className={`${inputClass} h-50 resize-none`}
									name="address"
									defaultValue={accountState.address}
									placeholder="Enter your address..."
									required
								></textarea>
								{!accountState.address && (
									<Button
										onClick={handleGeolocation}
										className="absolute right-3 bottom-3 flex h-13 w-55 flex-col items-center justify-center gap-2 hover:-translate-y-1 hover:bg-black! hover:text-white!"
									>
										{accountState.status === "loading" ? (
											<Loading alternate={true} />
										) : (
											"Use your position"
										)}
									</Button>
								)}
							</div>
						</div>
						<input
							name="cart"
							type="hidden"
							value={JSON.stringify(accountState.cart)}
						/>
						<input type="hidden" name="accountId" value={accountState.id} />
						<Button>ORDER ITEM(S)</Button>
					</Form>

					{/* Cart */}

					<div className="flex flex-col items-start xl:w-[50%]">
						<h2 className="mt-5 mb-5 w-full text-center sm:text-start">
							Your cart
						</h2>
						<div className="mb-10 flex max-h-150 w-full flex-col gap-10 overflow-y-auto xl:p-5">
							{cart.map((cartItem) => {
								return (
									<div className="flex w-full flex-wrap items-center justify-center gap-5 sm:flex-nowrap sm:justify-start 2xl:flex-nowrap">
										<div className="flex w-[20%] min-w-37.5 shrink-0 items-center justify-center rounded-xs p-1 sm:justify-start 2xl:border 2xl:border-[rgba(0,0,0,0.2)]">
											<img
												className="w-full"
												src={cartItem.itemImage}
												alt={cartItem.itemName}
											/>
										</div>
										<div className="flex w-full flex-col items-center justify-between py-1 pb-2 text-center sm:items-start 2xl:w-[80%]">
											<div className="mb-10 flex flex-col items-center text-center sm:items-start sm:text-start">
												<h3 className="line-clamp-2 text-[1.5rem]">
													{cartItem.itemName}
												</h3>
												<div className="flex items-center gap-3">
													<p className="opacity-65">
														Total Price: $
														{cartItem.itemPrice * cartItem.itemQuantity}
													</p>{" "}
													|
													<p className="opacity-65">
														Available Stock: {cartItem.itemStock}
													</p>
												</div>
											</div>
											<div className="flex w-full flex-wrap items-center justify-center gap-2 sm:justify-between sm:gap-5">
												<div className="flex gap-5">
													<button
														onClick={() => {
															dispatch(
																substractCartItemQuantity({
																	itemId: cartItem.itemId,
																	quantity: 1,
																}),
															);
														}}
														className={`flex cursor-pointer items-center justify-center rounded-xs border border-black bg-black px-3 py-0 pb-px text-white transition duration-200 hover:bg-white hover:text-black`}
													>
														-
													</button>
													{cartItem.itemQuantity}
													<button
														onClick={() => {
															if (cartItem.itemQuantity >= cartItem.itemStock)
																return;
															dispatch(
																addCartItemQuantity({
																	itemId: cartItem.itemId,
																	quantity: 1,
																}),
															);
														}}
														className="flex cursor-pointer items-center justify-center rounded-xs border border-black bg-black px-2.25 py-0 pb-px text-white transition duration-200 hover:bg-white hover:text-black"
													>
														+
													</button>
												</div>
												<div className="flex gap-2">
													<Link
														to={`/store/${cartItem.itemId}`}
														className="hover:black cursor-pointer rounded-xs border border-black bg-black px-5 py-2 text-white transition duration-200 hover:bg-white hover:text-black"
													>
														See Item Details
													</Link>
													<button
														onClick={() =>
															dispatch(deleteCartItem({ id: cartItem.itemId }))
														}
														className="cursor-pointer rounded-xs border border-red-500 bg-red-500 px-5 py-2 text-white transition duration-200 hover:bg-white hover:text-red-500"
													>
														Delete Item
													</button>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData) as FormOrderType;

	const newOrder: OrderItemType = {
		accountId: data.accountId,
		name: data.name,
		email: data.email,
		phone_number: data.phoneNumber,
		address: data.address,
		items: JSON.parse(data.cart),
	};

	await addNewOrder(newOrder);

	return { success: true };
}

export default Cart;
