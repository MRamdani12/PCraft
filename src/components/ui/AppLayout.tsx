import { Outlet, ScrollRestoration } from "react-router";

function AppLayout() {
	return (
		<main className="overflow-x-clip">
			<Outlet />
			<ScrollRestoration />
		</main>
	);
}

export default AppLayout;
