import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AccountStateType = {
	id: string | number;
	userName: string;
	email: string;
	createdAt: string;
};

const storageAccount = localStorage.getItem("account");

const initialAccount: AccountStateType = {
	id: "",
	userName: "",
	email: "",
	createdAt: "",
};

const initialState: AccountStateType = storageAccount
	? JSON.parse(storageAccount)
	: initialAccount;

const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		create: (_, action: PayloadAction<AccountStateType>) => {
			return action.payload;
		},
		deleteAccount: () => {
			return initialAccount;
		},
	},
});

export const { create, deleteAccount } = accountSlice.actions;

export default accountSlice.reducer;
