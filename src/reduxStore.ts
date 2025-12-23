import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./components/features/accounts/AccountSlice";
import { accountMiddleware } from "./components/features/accounts/accountMiddleware";

const store = configureStore({
	reducer: {
		account: accountReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(accountMiddleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
