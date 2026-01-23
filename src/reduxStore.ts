import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./components/features/accounts/AccountSlice";
import storeReducer from "./components/features/store/StoreSlice";
import { accountMiddleware } from "./components/features/accounts/accountMiddleware";

const store = configureStore({
	reducer: {
		account: accountReducer,
		store: storeReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(accountMiddleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
