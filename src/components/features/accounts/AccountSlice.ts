import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItemType } from "./utils/types/CartItemType";
import type { AccountStateType } from "./utils/types/AccountStateType";

const storageAccount = localStorage.getItem("account");

const initialAccount: AccountStateType = {
	id: "",
	userName: "",
	email: "",
	cart: [],
	createdAt: "",
	error: "",
};

const initialState: AccountStateType = storageAccount
	? JSON.parse(storageAccount)
	: initialAccount;

const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		createAccount: (_, action: PayloadAction<AccountStateType>) => {
			return action.payload;
		},
		addToCart: (state, action: PayloadAction<CartItemType>) => {
			if (!state.userName) {
				state.error =
					"Create an account first before adding items to your cart";
			} else {
				const existingItem = state.cart.find(
					(item) => item.itemId === action.payload.itemId,
				);

				if (existingItem) {
					existingItem.itemQuantity += 1;
				} else {
					state.cart = [...state.cart, action.payload];
				}
			}
		},
		addCartItemQuantity: (
			state,
			action: PayloadAction<{ itemId: number; quantity: number }>,
		) => {
			const existingItem = state.cart.find(
				(item) => item.itemId === action.payload.itemId,
			);
			if (existingItem) existingItem.itemQuantity += action.payload.quantity;
		},
		substractCartItemQuantity: (
			state,
			action: PayloadAction<{ itemId: number; quantity: number }>,
		) => {
			const existingItem = state.cart.find(
				(item) => item.itemId === action.payload.itemId,
			);

			if (existingItem) {
				if (existingItem.itemQuantity - action.payload.quantity < 1) {
					return;
				}
				existingItem.itemQuantity -= action.payload.quantity;
			}
		},
		deleteCartItem: (state, action: PayloadAction<{ id: number }>) => {
			const newCartState = state.cart.filter(
				(item) => item.itemId !== action.payload.id,
			);
			state.cart = newCartState;
		},
		deleteError: (state) => {
			state.error = "";
		},
		deleteAccount: () => {
			return initialAccount;
		},
	},
});

export const {
	createAccount,
	addToCart,
	addCartItemQuantity,
	substractCartItemQuantity,
	deleteCartItem,
	deleteError,
	deleteAccount,
} = accountSlice.actions;

export default accountSlice.reducer;
