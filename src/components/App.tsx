import { useEffect } from "react";
import Login from "./features/accounts/Login";
import Store from "./features/store/Store";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home/Home";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { useAppDispatch, useAppSelector } from "../utils/hooks/reduxHooks";
import { fetchStoreItems } from "./features/store/StoreSlice";
import StoreDetail from "./features/store/StoreDetail";
import Cart, { action as orderAction } from "./features/accounts/cart/Cart";
import OrderHistory, {
	loader as OrderHistoryLoader,
} from "./features/accounts/orders/OrderHistory";

const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "store", element: <Store /> },
			{ path: "store/:id", element: <StoreDetail /> },
			{ path: "login", element: <Login /> },
			{ path: "cart", element: <Cart />, action: orderAction },
			{
				path: "order-history/:accountId",
				element: <OrderHistory />,
				loader: OrderHistoryLoader,
			},
		],
	},
]);

function App() {
	const dispatch = useAppDispatch();
	const status = useAppSelector((state) => state.store.status);
	useEffect(() => {
		if (status !== "idle") return;
		dispatch(fetchStoreItems());
	}, [dispatch, status]);

	return <RouterProvider router={router} />;
}

export default App;
