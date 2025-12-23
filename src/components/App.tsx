import Login from "./features/accounts/Login";
import Store from "./features/store/Store";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "store", element: <Store /> },
			{ path: "login", element: <Login /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
