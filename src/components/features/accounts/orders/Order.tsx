import { useAppSelector } from "../../../../utils/hooks/reduxHooks";
import { payOrder } from "../../../../utils/services/apiServices";
import BackgroundBarAlternate from "../../../ui/backgrounds/BackgroundBarAlternate";

import type { OrderItemResponseType } from "../utils/types/OrderItemResponseType";

import OrderHeader from "./OrderHeader";
import OrderItem from "./OrderItem";

type OrderProps = {
	order: OrderItemResponseType;

	setIsPaymentLoading: React.Dispatch<React.SetStateAction<boolean>>;
	handleDeleteModalOpen: (id: string) => void;
};

function Order({
	order,
	setIsPaymentLoading,
	handleDeleteModalOpen,
}: OrderProps) {
	const accountId = useAppSelector((state) => state.account.id);

	const date = new Date(order.created_at);
	const formattedDate = date.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});

	async function handlePayNow() {
		setIsPaymentLoading(true);
		try {
			const url = await payOrder(order.id, accountId);
			window.location.href = url.checkoutUrl;
		} catch (error) {
			console.error(error);
		}

		setIsPaymentLoading(false);
	}

	return (
		<li className="relative flex w-full flex-col gap-5">
			<div className="order">
				<OrderHeader
					order={order}
					// Little prop drilling here, I can make this better with children but that gonna change a lot of code.
					handleDeleteModalOpen={handleDeleteModalOpen}
					handlePayNow={handlePayNow}
				/>
			</div>
			<ul className="flex flex-col items-start justify-start gap-5 xl:pl-30">
				<li className="order-item w-full">
					<div className="relative grid w-full justify-between gap-5 overflow-clip border border-[rgba(0,0,0,0.3)] bg-white py-5 text-center sm:grid-cols-3 sm:p-5 sm:pr-20! sm:text-start">
						<div>
							<h3 className="text-[20px] opacity-60">Order Date</h3>
							<p className="text-[24px]!">{formattedDate}</p>
						</div>
						<div>
							<h3 className="text-[20px] opacity-60">Name</h3>
							<p className="text-[24px]!">{order.name}</p>
						</div>
						<div>
							<h3 className="text-[20px] opacity-60">Email</h3>
							<p className="text-[24px]!">{order.email}</p>
						</div>
						<div className="w-full sm:col-span-3">
							<h3 className="text-[20px] opacity-60">Address</h3>
							<p className="text-[24px]!">{order.address}</p>
						</div>
						<BackgroundBarAlternate className="absolute -right-1 -bottom-50 hidden rotate-y-180 sm:block" />
					</div>
				</li>

				{order.items.map((item) => {
					return (
						<li key={item.itemId}>
							<OrderItem cartItem={item} />
						</li>
					);
				})}
			</ul>
		</li>
	);
}

export default Order;
