import type { OrderItemResponseType } from "../../components/features/accounts/utils/types/OrderItemResponseType";
import type { OrderItemType } from "../../components/features/accounts/utils/types/OrderItemType";
import type { SortFilterType } from "../../components/features/store/utils/types/SortFilterType";
import type { StoreItemResponseType } from "../../components/features/store/utils/types/StoreItemsResponseType";
import type { StoreItemType } from "../../components/features/store/utils/types/StoreItemsType";

const API_URL = "https://pcraft.mramdani.workers.dev";

// PC_PARTS
export async function getSingleStoreItem(id: number) {
	const res = await fetch(`${API_URL}/pc-parts/${id}`);

	if (!res.ok) throw new Error("Something's wrong, try again later");

	const data: StoreItemType = await res.json();

	return data;
}

export async function getStoreItems(
	limit?: number,
	cursor?: number | null,
	categories?: string[] | null,
	sort?: SortFilterType | null,
	q?: string | null,
) {
	let limitParams;
	let cursorParams;
	let categoriesParams;
	let sortParams;
	let qParams;

	if (limit) limitParams = `limit=${limit}`;
	if (cursor) cursorParams = `&cursor=${cursor}`;
	if (categories) {
		categoriesParams = `${categories.map((category) => `&category=${category}`).join("")}`;
	}
	if (sort) {
		if (sort !== "Default") sortParams = `&sort=${encodeURIComponent(sort)}`;
	}
	if (q) qParams = `&q=${encodeURIComponent(q)}`;

	const fetchUrl = `${API_URL}/pc-parts?${limitParams ? limitParams : ""}${cursorParams ? cursorParams : ""}${categoriesParams ? categoriesParams : ""}${sortParams ? sortParams : ""}${qParams ? qParams : ""}`;

	const res = await fetch(fetchUrl);

	if (!res.ok) throw new Error("Something's wrong, try again later");

	const data: StoreItemResponseType = await res.json();

	return data;
}

// ORDERS
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
	console.log(data);

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
