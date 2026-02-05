import type { CartItemType } from "./CartItemType";

export type OrderItemResponseType = {
	id: string;
	account_id: string;
	status:
		| "waiting_payment"
		| "paying"
		| "processing"
		| "delivering"
		| "arrived"
		| "completed";
	name: string;
	email: string;
	phone_number: string;
	address: string;
	items: CartItemType[];
	paid_at: number | null;
	created_at: number;
	checkout_session_id: string | null;
	checkout_expires_at: number | null;
	checkout_url: string | null;
};
