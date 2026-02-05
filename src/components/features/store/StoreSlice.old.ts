import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import type { StoreItemType } from "./utils/types/StoreItemsType";

type initialStateType = {
	status: "idle" | "loading" | "fulfilled" | "error";
	error: string | undefined;
	items: StoreItemType[];
};

const initialState: initialStateType = {
	status: "idle",
	error: "",
	items: [],
};

export const fetchStoreItems = createAsyncThunk(
	"store/fetchStoreItems",
	async function () {
		const data = await fetch("https://pcraft.mramdani.workers.dev/pc-parts");

		// Redux will automatically send the code to rejected state if the code below is true
		if (!data.ok) throw new Error("Something's wrong, try again later");

		const items: StoreItemType[] = await data.json();

		// Items will be injected into action.payload
		return items;
	},
);

const storeSlice = createSlice({
	name: "store",
	initialState,
	reducers: {
		// This is wrong, it's suppose to add items to the Cloudflare Worker instead of adding it to the state. I leave it here so maybe in the future I can fix it when I learn enough backend
		addItems: (state, action: PayloadAction<StoreItemType[]>) => {
			state.items.push(...action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchStoreItems.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchStoreItems.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = "fulfilled";
			})
			.addCase(fetchStoreItems.rejected, (state, action) => {
				state.status = "error";
				state.error = action.error.message;
			});
	},
});

export const { addItems } = storeSlice.actions;

export default storeSlice.reducer;
