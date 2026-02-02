import type { CartItemType } from "./CartItemType";

export type OrderItemType = {
	accountId: string;
	name: string;
	email: string;
	phone_number: string;
	address: string;
	items: CartItemType[];
};
