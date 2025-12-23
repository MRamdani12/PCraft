import Container from "../../ui/Container";
import Navigation from "../../ui/navigation/Navigation";
import Filter from "./filter/Filter";

function Store() {
	return (
		<>
			<Navigation />
			<div className="pt-30">
				<Container>
					<Filter />
				</Container>
			</div>
		</>
	);
}

export default Store;
