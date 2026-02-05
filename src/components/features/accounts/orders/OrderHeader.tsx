import { useCheckoutCountdown } from "../utils/hooks/useCheckoutCountdown";
import { formatRemainingTime } from "../utils/hooks/formatRemainingTime";
import { confirmOrder } from "../../../../utils/services/apiServices";
import { useRevalidator } from "react-router";

import type { OrderItemResponseType } from "../utils/types/OrderItemResponseType";

import BackgroundFourIncline from "../../../ui/backgrounds/BackgroundFourIncline";
import BackgroundFourInclineStroke from "../../../ui/backgrounds/BackgroundFourInclineStroke";
import Button from "../../../ui/buttons/Button";
import waitingPayment from "../../../../assets/icons/waiting_payment.svg";
import pendingPayment from "../../../../assets/icons/pending_payment.svg";
import processing from "../../../../assets/icons/processing.svg";
import delivering from "../../../../assets/icons/delivering.svg";
import arrived from "../../../../assets/icons/arrived.svg";
import completed from "../../../../assets/icons/completed.svg";

type OrderHeaderProps = {
	order: OrderItemResponseType;
	handleDeleteModalOpen: (id: string) => void;
	handlePayNow: () => void;
};

function OrderHeader({
	order,
	handleDeleteModalOpen,
	handlePayNow,
}: OrderHeaderProps) {
	const remainingMs = useCheckoutCountdown(order.checkout_expires_at);
	const revalidator = useRevalidator();

	let orderStatusFormatted;
	let orderStatusSVG;

	const totalItemPrice = order.items.reduce(
		(acc, item) => acc + item.itemPrice * item.itemQuantity,
		0,
	);

	const totalPrice = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(totalItemPrice);

	switch (order.status) {
		case "waiting_payment":
			orderStatusFormatted = "Waiting Payment";
			orderStatusSVG = waitingPayment;
			break;
		case "paying":
			orderStatusFormatted = "Pending Payment";
			orderStatusSVG = pendingPayment;
			break;
		case "processing":
			orderStatusFormatted = "Processing";
			orderStatusSVG = processing;
			break;
		case "delivering":
			orderStatusFormatted = "Delivering";
			orderStatusSVG = delivering;
			break;
		case "arrived":
			orderStatusFormatted = "Arrived";
			orderStatusSVG = arrived;
			break;
		case "completed":
			orderStatusFormatted = "Completed";
			orderStatusSVG = completed;
			break;
	}

	return (
		<>
			<div className="relative w-full overflow-clip border border-[rgba(0,0,0,0.3)] px-10 py-10">
				<BackgroundFourIncline className="absolute -right-15 -bottom-5 z-0 opacity-10" />
				<BackgroundFourInclineStroke className="absolute -top-5 -left-15 z-0 rotate-x-180 opacity-20" />

				{order.status !== "waiting_payment" && order.status !== "paying" && (
					<div className="relative z-1 flex flex-col items-center justify-center gap-5 px-10 text-center xl:flex-row xl:justify-around xl:gap-3">
						<div className="flex flex-col items-center justify-center">
							<span>Order ID</span>
							<h2 className="text-[28px]!">{order.id}</h2>
						</div>
						<div className="flex flex-col items-center justify-center text-center">
							<span>Order Status</span>
							<h2 className="flex items-center justify-center gap-3 text-[28px]!">
								<img src={orderStatusSVG} />

								{orderStatusFormatted}
							</h2>
						</div>
						<div className="flex flex-col items-center justify-center text-center">
							<span>Total Price</span>
							<h2 className="flex items-center justify-center gap-3 text-[28px]!">
								{totalPrice}
							</h2>
						</div>
						{order.status === "arrived" && (
							<div className="flex flex-col items-center justify-center text-center">
								<Button
									onClick={async () => {
										await confirmOrder(order.id);
										await revalidator.revalidate();
									}}
									className="border-green-600 bg-green-600 hover:text-green-600"
								>
									CONFIRM ORDER
								</Button>
							</div>
						)}
						{order.status === "completed" && (
							<div className="flex flex-col items-center justify-center text-center">
								<Button
									onClick={() => handleDeleteModalOpen(order.id)}
									className="border-red-600 bg-red-600 hover:text-red-600"
								>
									DELETE ORDER
								</Button>
							</div>
						)}
					</div>
				)}

				{order.status === "paying" && (
					<div className="grid-row-2 relative z-10 flex grid-cols-[0.7fr_1fr_0.7fr] flex-col items-center justify-center gap-2 text-center xl:grid xl:text-start">
						<div className="flex flex-col items-center justify-center text-center xl:items-start xl:text-start">
							<span>Order ID</span>
							<h2 className="text-[36px]! xl:text-[28px]!">{order.id}</h2>
						</div>
						<div className="row-span-2 mb-10 flex h-full flex-col items-center justify-center gap-2 border-[rgba(0,0,0,0.3)] xl:mb-0 xl:border-x">
							<Button
								onClick={() => {
									handlePayNow();
								}}
								className="mt-9 xl:w-[60%]"
							>
								PAY NOW
							</Button>
							<span>
								Payment expires in: {formatRemainingTime(remainingMs)}
							</span>
						</div>
						<div className="flex flex-col items-center justify-center text-center xl:items-end">
							<span className="mb-1 xl:mb-0">Order Status</span>
							<h2 className="mt-2 flex flex-wrap items-center justify-center gap-3 text-[28px]! xl:mt-0">
								<img src={orderStatusSVG} />

								{orderStatusFormatted}
							</h2>
						</div>
						<div className="flex flex-col items-center justify-center text-center xl:items-start">
							<span>Total Price</span>
							<h2 className="flex items-center justify-center gap-3 text-[28px]!">
								{totalPrice}
							</h2>
						</div>
						<div className="flex flex-col items-center justify-center gap-3 xl:items-end">
							<span>Cancel Order</span>
							<Button
								onClick={() => handleDeleteModalOpen(order.id)}
								className="border-red-600 bg-red-600 hover:text-red-600"
							>
								CANCEL ORDER
							</Button>
						</div>
					</div>
				)}

				{order.status === "waiting_payment" && (
					<div className="grid-row-2 relative z-10 flex grid-cols-[0.7fr_1fr_0.7fr] flex-col items-center justify-center gap-2 text-center xl:grid xl:text-start">
						<div className="flex flex-col items-center justify-center text-center xl:items-start xl:text-start">
							<span>Order ID</span>
							<h2 className="text-[36px]! xl:text-[28px]!">{order.id}</h2>
						</div>
						<div className="row-span-2 mb-10 flex h-full items-center justify-center border-[rgba(0,0,0,0.3)] xl:mb-0 xl:border-x">
							<Button
								onClick={() => {
									handlePayNow();
								}}
								className="xl:w-[60%]"
							>
								PAY NOW
							</Button>
						</div>
						<div className="flex flex-col items-center justify-center text-center xl:items-end">
							<span className="mb-1 xl:mb-0">Order Status</span>
							<h2 className="mt-2 flex flex-wrap items-center justify-center gap-3 text-[28px]! xl:mt-0">
								<img src={orderStatusSVG} />
								{orderStatusFormatted}
							</h2>
						</div>
						<div className="flex flex-col items-center justify-center text-center xl:items-start">
							<span>Total Price</span>
							<h2 className="flex items-center justify-center gap-3 text-[28px]!">
								{totalPrice}
							</h2>
						</div>
						<div className="flex flex-col items-center justify-center gap-3 xl:items-end">
							<span>Cancel Order</span>
							<Button
								onClick={() => handleDeleteModalOpen(order.id)}
								className="border-red-500 bg-red-500 hover:text-red-500"
							>
								CANCEL ORDER
							</Button>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default OrderHeader;
