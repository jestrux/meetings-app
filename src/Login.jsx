import { useState } from "react";
import {
	Card,
	Heading,
	Button,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	FormControl,
	FormLabel,
	Stack,
	Box,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	CloseButton,
	SimpleGrid,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useAPI from "./hooks/useAPI";

function formDataObject(form) {
	return Array.from(new FormData(form)).reduce(
		(agg, [key, value]) => ({
			...agg,
			[key]: value,
		}),
		{}
	);
}

const Login = ({ onLogin }) => {
	const [login, { loading: authenticating }] = useAPI("/login");
	const [showPassword, setShowPassword] = useState(null);
	const [message, setMessage] = useState(null);

	const handleLogin = async (e) => {
		e.preventDefault();
		const form = e.target;

		setMessage(null);

		const res = await login(formDataObject(form));

		if (res?.id) {
			setMessage({
				type: "success",
				content: "We'll get back to you soon.",
			});

			form.reset();

			onLogin(res);
		} else {
			setMessage({
				type: "error",
				content: "Whoops! Wrong credentials!",
			});
		}
	};

	return (
		<Box
			display="flex"
			alignItems="center"
			justifyContent="center"
			style={{ backgroundColor: "#f5f5f5", height: "100vh" }}
		>
			<Box w="full" maxW="5xl">
				<Card overflow="hidden">
					<SimpleGrid columns={2}>
						<Box position="relative">
							<img
								className="position-absolute w-100 h-100"
								src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDF8fGZhbmN5JTIwaG91c2V8ZW58MHx8fHwxNjg3NDEzNTg3fDA&ixlib=rb-4.0.3&q=80&w=1080"
								alt=""
								style={{ objectFit: "cover" }}
							/>
						</Box>

						<Box py="24" px="12">
							<Heading size="lg" mb="5">
								Sign in to NIC Meetings
							</Heading>

							{message && (
								<Alert
									mb="4"
									status={message.type}
									variant="subtle"
								>
									<AlertIcon />
									<AlertTitle textTransform="capitalize">
										{message.type}!
									</AlertTitle>
									<AlertDescription>
										{message.content}
									</AlertDescription>
									<CloseButton
										alignSelf="flex-start"
										position="absolute"
										right={1}
										top={1}
										onClick={() => setMessage(null)}
									/>
								</Alert>
							)}

							<form onSubmit={handleLogin}>
								<Stack spacing={4}>
									<FormControl w="full">
										<FormLabel>Email address</FormLabel>
										<Input
											size="lg"
											type="email"
											name="email"
										/>
									</FormControl>

									<FormControl w="full">
										<FormLabel>Password</FormLabel>
										<InputGroup>
											<Input
												size="lg"
												type={
													showPassword
														? "text"
														: "password"
												}
												name="password"
											/>
											<InputRightElement>
												<IconButton
													mt="2"
													mr="2"
													variant="ghost"
													icon={
														!showPassword ? (
															<ViewIcon />
														) : (
															<ViewOffIcon />
														)
													}
													onClick={() =>
														setShowPassword(
															!showPassword
														)
													}
												/>
											</InputRightElement>
										</InputGroup>
									</FormControl>

									{/* <div className="form-group form-check form-check-lg">
								<input
									type="checkbox"
									className="form-check-input"
									id="exampleCheck1"
								/>
								<label
									className="form-check-label"
									htmlFor="exampleCheck1"
								>
									Remember me
								</label>
							</div> */}
									<Box mt="1">
										<Button
											w="full"
											type="submit"
											size="lg"
											isLoading={authenticating}
											loadingText="Please wait..."
										>
											Submit
										</Button>
									</Box>
								</Stack>
							</form>
						</Box>
					</SimpleGrid>
				</Card>
			</Box>
		</Box>
	);
};

export default Login;
