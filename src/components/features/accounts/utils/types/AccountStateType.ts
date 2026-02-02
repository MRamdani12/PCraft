import type { CartItemType } from "./CartItemType";

export type AccountStateType = {
	id: string;
	userName: string;
	email: string;
	phoneNumber: number | string;
	address: string;
	cart: CartItemType[];
	error: string;
	status: "idle" | "error" | "loading";
	createdAt: string;
};
