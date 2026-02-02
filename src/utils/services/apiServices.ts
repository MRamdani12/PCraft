import type { OrderItemResponseType } from "../../components/features/accounts/utils/types/OrderItemResponseType";
import type { OrderItemType } from "../../components/features/accounts/utils/types/OrderItemType";

const API_URL = "https://pcraft.mramdani.workers.dev";

export async function getAllOrders(): Promise<OrderItemResponseType[] | Error> {
	const res = await fetch(`${API_URL}/orders`);

	if (!res.ok) throw new Error("Something's wrong, try again later");

	const data: OrderItemResponseType[] = await res.json();

	return data;
}

export async function getOrder(
	id: string,
): Promise<OrderItemResponseType | Error> {
	const res = await fetch(`${API_URL}/orders/${id}`);

	if (!res.ok) throw new Error("Something's wrong, try again later");

	const data: OrderItemResponseType = await res.json();

	return data;
}

export async function getAccountOrders(
	accountId: string,
): Promise<OrderItemResponseType[] | Error> {
	const res = await fetch(`${API_URL}/orders/${accountId}`);

	if (!res.ok) throw new Error("Something's wrong, try again later");

	const data: OrderItemResponseType[] = await res.json();

	return data;
}

export async function deleteOrder(id: string) {
	const res = await fetch(`${API_URL}/orders`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ orderId: id }),
	});
	if (!res.ok) throw new Error("Something's wrong, try again later");
	return { success: true };
}

export async function addNewOrder(newOrder: OrderItemType) {
	const res = await fetch(`${API_URL}/orders`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newOrder),
	});
	if (!res.ok) throw new Error("Something's wrong, try again later");
	return { success: true };
}

export async function payOrder(
	id: string,
	accountId: string,
): Promise<{ checkoutUrl: string }> {
	const res = await fetch("https://pcraft.mramdani.workers.dev/pay", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			orderId: id,
			accountId,
		}),
	});

	if (!res.ok) throw new Error("Something's wrong, try again later");

	const data = await res.json();

	return data;
}

export async function confirmOrder(id: string) {
	const res = await fetch(`${API_URL}/orders/confirm`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			orderId: id,
		}),
	});

	if (!res.ok) throw new Error("Something's wrong, try again later");
}
