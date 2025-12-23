import { Outlet } from "react-router";

function AppLayout() {
	return (
		<main className="overflow-x-hidden">
			<Outlet />
		</main>
	);
}

export default AppLayout;
