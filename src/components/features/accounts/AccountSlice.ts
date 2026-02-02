import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import type { CartItemType } from "./utils/types/CartItemType";
import type { AccountStateType } from "./utils/types/AccountStateType";
import { getAddress } from "../../../utils/services/getAddress";
import type { GeoLocationPositionType } from "../../../utils/types/GeoLocationPositionType";
// import type { OrderItemType } from "./utils/types/OrderItemType";
// import { createListenerMiddleware } from "@reduxjs/toolkit";

const storageAccount = localStorage.getItem("account");

const initialAccount: AccountStateType = {
	id: "",
	userName: "",
	email: "",
	phoneNumber: "",
	address: "",
	cart: [],

	createdAt: "",
	error: "",
	status: "idle",
};

const initialState: AccountStateType = storageAccount
	? JSON.parse(storageAccount)
	: initialAccount;

function getGeolocation(): Promise<GeoLocationPositionType> {
	if (!navigator.geolocation) {
		alert("Your browser does not support geolocation");
		console.error("Your browser does not support geolocation");
	}

	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position) =>
				resolve({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				}),
			(error) => reject(new Error(error.message)),
		);
	});
}

export const fetchAddress = createAsyncThunk(
	"account/fetchAddress",
	async () => {
		const positionObj = await getGeolocation();
		const position = {
			lat: positionObj.lat,
			lng: positionObj.lng,
		};

		const addressObj = await getAddress(position);
		const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode ?? null}, ${addressObj?.countryName}`;

		return { address };
	},
);

// export const syncOrdersWithServer = createAsyncThunk(
// 	"account/syncOrdersWithServer",
// 	async () => {
// 		const data = await fetch("https://pcraft.mramdani.workers.dev/orders");

// 		// Redux will automatically send the code to rejected state if the code below is true
// 		if (!data.ok) throw new Error("Something's wrong, try again later");

// 		// Items will be injected into action.payload
// 		const items: OrderItemType[] = await data.json();

// 		return items;
// 	},
// );

// export const deleteOrder = createAsyncThunk(
// 	"account/deleteOrder",
// 	async (id: string) => {
// 		await fetch(`https://pcraft.mramdani.workers.dev/orders/${id}`, {
// 			method: "DELETE",
// 		});
// 		return id;
// 	},
// );

// export const accountListener = createListenerMiddleware();

// accountListener.startListening({
// 	actionCreator: syncOrdersWithServer.fulfilled,
// 	effect: (action) => {
// 		const account = localStorage.getItem("account");
// 		if (!account) {
// 			return;
// 		}
// 		let accountData: AccountStateType = JSON.parse(account);

// 		accountData = {
// 			...accountData,
// 			orders: action.payload,
// 		};

// 		localStorage.setItem("account", JSON.stringify(accountData));
// 	},
// });

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
		// addOrder: (state, action: PayloadAction<OrderItemType>) => {
		// 	console.log("asd");
		// 	state.orders = [...state.orders, action.payload];
		// },
		// changeOrderStatus: (
		// 	state,
		// 	action: PayloadAction<{
		// 		id: string;
		// 		status:
		// 			| "waiting_payment"
		// 			| "paying"
		// 			| "processing"
		// 			| "delivering"
		// 			| "arrived"
		// 			| "completed";
		// 	}>,
		// ) => {
		// 	const order = state.orders.find(
		// 		(order) => order.id === action.payload.id,
		// 	);

		// 	if (order) {
		// 		order.status = action.payload.status;
		// 	}
		// },
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
		changeCartItemQuantity: (
			state,
			action: PayloadAction<{ itemId: number; quantity: number }>,
		) => {
			const cartItem = state.cart.find(
				(item) => item.itemId === action.payload.itemId,
			);

			if (cartItem) {
				if (action.payload.quantity >= cartItem.itemStock) return;
				cartItem.itemQuantity = action.payload.quantity;
			}
		},
		deleteCartItem: (state, action: PayloadAction<{ id: number }>) => {
			const newCartState = state.cart.filter(
				(item) => item.itemId !== action.payload.id,
			);
			state.cart = newCartState;
		},

		clearCart: (state) => {
			state.cart = [];
		},
		deleteError: (state) => {
			state.error = "";
			state.status = "idle";
		},
		deleteAccount: () => {
			return initialAccount;
		},
	},
	extraReducers: (builder) => {
		builder
			// Fetch address async thunk
			.addCase(fetchAddress.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchAddress.fulfilled, (state, action) => {
				state.address = action.payload.address;
				state.status = "idle";
			})
			.addCase(fetchAddress.rejected, (state, action) => {
				state.error =
					action.error.message ??
					"Something's wrong when fetching address, please fill the address yourself!";
				state.status = "error";
			});

		// SyncOrdersWithServer async thunk
		// .addCase(syncOrdersWithServer.fulfilled, (state, action) => {
		// 	state.orders = action.payload;
		// 	localStorage.getItem("");
		// 	state.status = "idle";
		// })
		// .addCase(syncOrdersWithServer.rejected, (state, action) => {
		// 	state.error =
		// 		action.error.message ?? "Something's wrong, try again later";
		// 	state.status = "error";
		// });

		// Delete order
		// .addCase(deleteOrder.pending, (state) => {
		// 	state.status = "loading";
		// })
		// .addCase(deleteOrder.fulfilled, (state, action) => {
		// 	state.orders = state.orders.filter(
		// 		(order) => order.id !== action.payload,
		// 	);
		// 	state.status = "idle";
		// })
		// .addCase(deleteOrder.rejected, (state, action) => {
		// 	state.error =
		// 		action.error.message ?? "Something's wrong, try again later";
		// 	state.status = "error";
		// });
	},
});

export const {
	createAccount,
	addToCart,
	// addOrder,
	// changeOrderStatus,
	addCartItemQuantity,
	substractCartItemQuantity,
	changeCartItemQuantity,
	deleteCartItem,
	clearCart,
	deleteError,
	deleteAccount,
} = accountSlice.actions;

export default accountSlice.reducer;
