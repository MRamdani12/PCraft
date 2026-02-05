import type { StoreItemType } from "./StoreItemsType";

export type StoreItemResponseType = {
	items: StoreItemType[];
	nextCursor: number | null;
};
