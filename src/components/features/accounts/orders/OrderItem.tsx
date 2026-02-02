import BackgroundFourIncline from "../../../ui/backgrounds/BackgroundFourIncline";
import BackgroundFourInclineStroke from "../../../ui/backgrounds/BackgroundFourInclineStroke";
import Button from "../../../ui/buttons/Button";
import type { CartItemType } from "../utils/types/CartItemType";

function OrderItem({ cartItem }: { cartItem: CartItemType }) {
	return (
		<div className="order-item pl flex w-full flex-col overflow-clip border border-[rgba(0,0,0,0.2)] bg-white xl:max-h-75 xl:flex-row">
			<div className="flex items-center justify-center border-b border-[rgba(0,0,0,0.2)] xl:w-[25%] xl:border-r xl:border-b-0">
				<img
					className="w-full"
					src={cartItem.itemImage}
					alt={cartItem.itemName}
				/>
			</div>
			<div className="relative flex w-full flex-col items-start justify-between gap-5 overflow-clip px-5 py-10 xl:w-[75%] xl:gap-0 xl:py-5">
				<BackgroundFourIncline className="absolute -right-10 -bottom-5 z-0 hidden xl:block" />
				<BackgroundFourInclineStroke className="absolute -top-5 -left-10 z-0 opacity-30" />

				<div>
					<h2 className="mb-2 line-clamp-2 text-4xl!">{cartItem.itemName}</h2>
					<p className="line-clamp-2">{cartItem.itemDescription}</p>
				</div>
				<div className="flex items-center justify-center gap-10">
					<div>
						<h3>Total Items</h3>
						<p>
							{cartItem.itemQuantity} item
							{cartItem.itemQuantity > 1 ? "s" : ""}
						</p>
					</div>
					<div>
						<h3>Total Price</h3>
						<p>
							{new Intl.NumberFormat("en-US", {
								style: "currency",
								currency: "USD",
							}).format(cartItem.itemQuantity * cartItem.itemPrice)}
						</p>
					</div>
				</div>
				<Button to={`/store/${cartItem.itemId}`}>SEE ITEM DETAILS</Button>
			</div>
		</div>
	);
}

export default OrderItem;
