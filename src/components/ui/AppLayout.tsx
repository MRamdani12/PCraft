import { Outlet, ScrollRestoration, useNavigation } from "react-router";
import PageLoading from "./PageLoading";
import FadeInOut from "./animations/FadeInOut";

function AppLayout() {
	const navigation = useNavigation();

	return (
		<main className="overflow-x-clip">
			<FadeInOut show={navigation.state === "loading"}>
				<PageLoading>Please Wait...</PageLoading>
			</FadeInOut>

			<Outlet />
			<ScrollRestoration />
		</main>
	);
}

export default AppLayout;
