import { Link } from "react-router";
import {
	useAppDispatch,
	useAppSelector,
} from "../../../../utils/hooks/reduxHooks";

import BackgroundBarAlternateStroke from "../../../ui/backgrounds/BackgroundBarAlternateStroke";
import Button from "../../../ui/Button";
import Navigation from "../../../ui/navigation/Navigation";
import {
	addCartItemQuantity,
	deleteCartItem,
	substractCartItemQuantity,
} from "../AccountSlice";
import MessageBox from "../../../ui/MessageBox";

function Cart() {
	const cart = useAppSelector((state) => state.account.cart);
	const dispatch = useAppDispatch();

	const inputContainerClass = "flex flex-col gap-2";
	const inputClass = "rounded-xs border border-[rgba(0,0,0,0.8)] px-3 py-2";

	return (
		<>
			<Navigation />
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
				<div className="relative flex h-dvh max-h-dvh gap-20 overflow-hidden px-30 pt-30">
					<BackgroundBarAlternateStroke className="absolute -top-10 left-0" />
					<form className="w-[50%]">
						<h1>Enter your information</h1>
						<div className="mt-5 mb-10 flex flex-col gap-5">
							<div className={inputContainerClass}>
								<label htmlFor="email">Email</label>
								<input
									className={inputClass}
									name="email"
									type="text"
									placeholder="Enter your email..."
								/>
							</div>
							<div className={inputContainerClass}>
								<label htmlFor="Username">Username</label>
								<input className={inputClass} name="Username" type="text" />
							</div>
							<div className={inputContainerClass}>
								<label htmlFor="phoneNumber">Phone number</label>
								<input className={inputClass} name="phoneNumber" type="text" />
							</div>
							<div className={`${inputContainerClass}`}>
								<label htmlFor="Address">Address</label>
								<textarea
									className={inputClass}
									name="Address"
									id=""
								></textarea>
							</div>
						</div>
						<Button>ORDER ITEM</Button>
					</form>
					<div className="w-[50%]">
						<h2>Your cart</h2>
						<div className="flex flex-col gap-5">
							{cart.map((cartItem) => {
								return (
									<div className="flex gap-5">
										<div className="flex w-[20%] items-center justify-center rounded-xs border border-[rgba(0,0,0,0.2)] p-1">
											<img
												className="w-full"
												src={cartItem.itemImage}
												alt={cartItem.itemName}
											/>
										</div>
										<div className="flex w-[80%] flex-col items-start justify-between py-1 pb-2">
											<div>
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
											<div className="flex w-full items-center justify-between">
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

export default Cart;
