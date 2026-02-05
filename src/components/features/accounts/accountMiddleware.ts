import type { Middleware } from "@reduxjs/toolkit";
import {
	addCartItemQuantity,
	addToCart,
	clearCart,
	createAccount,
	deleteAccount,
	deleteCartItem,
	substractCartItemQuantity,
} from "./AccountSlice";
import type { AccountStateType } from "./utils/types/AccountStateType";

export const accountMiddleware: Middleware = () => (next) => (action) => {
	const result = next(action);

	if (createAccount.match(action)) {
		localStorage.setItem("account", JSON.stringify(action.payload));
	}

	if (addToCart.match(action)) {
		const account = localStorage.getItem("account");
		if (!account) {
			return result;
		}
		let accountData: AccountStateType = JSON.parse(account);
		const existingItem = accountData.cart.find(
			(item) => item.itemId === action.payload.itemId,
		);

		if (existingItem) {
			existingItem.itemQuantity += 1;
		} else {
			accountData = {
				...accountData,
				cart: [...accountData.cart, action.payload],
			};
		}

		localStorage.setItem("account", JSON.stringify(accountData));
	}

	if (addCartItemQuantity.match(action)) {
		const account = localStorage.getItem("account");
		if (!account) {
			return result;
		}
		const accountData: AccountStateType = JSON.parse(account);
		const existingItem = accountData.cart.find(
			(item) => item.itemId === action.payload.itemId,
		);

		if (existingItem) {
			existingItem.itemQuantity += action.payload.quantity;
		}

		localStorage.setItem("account", JSON.stringify(accountData));
	}

	if (substractCartItemQuantity.match(action)) {
		const account = localStorage.getItem("account");
		if (!account) {
			return result;
		}
		const accountData: AccountStateType = JSON.parse(account);
		const existingItem = accountData.cart.find(
			(item) => item.itemId === action.payload.itemId,
		);

		if (existingItem) {
			if (existingItem.itemQuantity - action.payload.quantity < 1) {
				return result;
			}
			existingItem.itemQuantity -= action.payload.quantity;
		}

		localStorage.setItem("account", JSON.stringify(accountData));
	}

	if (deleteCartItem.match(action)) {
		const account = localStorage.getItem("account");
		if (!account) {
			return result;
		}
		const accountData: AccountStateType = JSON.parse(account);
		const filteredAccountDataCart = accountData.cart.filter(
			(item) => item.itemId !== action.payload.id,
		);
		accountData.cart = [...filteredAccountDataCart];

		localStorage.setItem("account", JSON.stringify(accountData));
	}

	if (clearCart.match(action)) {
		const account = localStorage.getItem("account");
		if (!account) {
			return result;
		}
		const accountData: AccountStateType = JSON.parse(account);

		accountData.cart = [];

		localStorage.setItem("account", JSON.stringify(accountData));
	}

	if (deleteAccount.match(action)) localStorage.removeItem("account");

	return result;
};
