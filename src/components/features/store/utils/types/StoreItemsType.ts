export type StoreItemType = {
	id: number;
	name: string;
	price: number;
	stock: number;
	category: string;
	created_at: string;
	gallery: { label: string; url: string }[];
	description: {
		intro: string;
		features: { name: string; description: string }[];
	};
};
