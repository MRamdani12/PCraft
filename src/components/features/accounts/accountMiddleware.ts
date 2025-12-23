import type { Middleware } from "@reduxjs/toolkit";

type AccountStateType = {
	id: string | number;
	userName: string;
	email: string;
	createdAt: string;
};

type MyAction = {
	type: string;
	payload: AccountStateType | undefined;
};

// Some type checking function to check for the type of action
function isMyAction(action: unknown): action is MyAction {
	if (typeof action !== "object" || action === null) return false;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const a = action as any;

	if (typeof a.type !== "string") return false;
	if (a.payload === undefined) return true;

	return (
		typeof a.payload === "object" &&
		(typeof a.payload.id === "string" || typeof a.payload.id === "number") &&
		typeof a.payload.userName === "string" &&
		typeof a.payload.email === "string" &&
		typeof a.payload.createdAt === "string"
	);
}

export const accountMiddleware: Middleware = () => (next) => (action) => {
	if (!isMyAction(action)) {
		console.log("red");
		return next(action);
	}

	const result = next(action);

	if (action.type === "account/create") {
		localStorage.setItem("account", JSON.stringify(action.payload));
	}

	if (action.type === "account/deleteAccount") {
		localStorage.removeItem("account");
	}

	return result;
};
