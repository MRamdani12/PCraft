import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import StoreDetail, {
	loader as storeDetailLoader,
} from "./features/store/StoreDetail";
import Cart, { action as orderAction } from "./features/accounts/cart/Cart";
import OrderHistory, {
	loader as OrderHistoryLoader,
} from "./features/accounts/orders/OrderHistory";
import Login from "./features/accounts/Login";
import Store from "./features/store/Store";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home/Home";

const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "store", element: <Store /> },
			{
				path: "store/:id",
				element: <StoreDetail />,
				loader: storeDetailLoader,
			},
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
	return <RouterProvider router={router} />;
}

export default App;
