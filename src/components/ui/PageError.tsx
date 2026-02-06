import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";
import Container from "./Container";
import MessageBox from "./MessageBox";
import Navigation from "./navigation/Navigation";
import Button from "./buttons/Button";

function PageError() {
	const navigate = useNavigate();
	const error = useRouteError();

	let message = "Unknown Error";
	let status;

	if (isRouteErrorResponse(error)) {
		message = error.statusText;
		status = error.status;
	} else if (error instanceof Error) {
		message = error.message;
	}

	return (
		<div>
			<Navigation />
			<Container>
				<div className="flex h-dvh flex-col items-center justify-center">
					<MessageBox className="flex flex-col items-center justify-center py-30">
						<h1>Something went wrong</h1>
						<p></p>
						<p className="mb-10">
							{status ? `${status}:` : ""} {message}
						</p>
						<Button onClick={() => navigate(-1)}>← Go back</Button>
					</MessageBox>
				</div>
			</Container>
		</div>
	);
}

export default PageError;
