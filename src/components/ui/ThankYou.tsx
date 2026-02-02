import Container from "./Container";
import Navigation from "./navigation/Navigation";

function ThankYou() {
	return (
		<>
			<Navigation />
			<div className="pt-50 text-center">
				<Container>
					<h1>Thank you for your purchase!</h1>
				</Container>
			</div>
		</>
	);
}

export default ThankYou;
