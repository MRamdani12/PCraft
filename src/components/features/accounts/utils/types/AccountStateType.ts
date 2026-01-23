import type { CartItemType } from "./CartItemType";

export type AccountStateType = {
	id: string | number;
	userName: string;
	email: string;
	cart: CartItemType[];
	error: string;
	createdAt: string;
};
