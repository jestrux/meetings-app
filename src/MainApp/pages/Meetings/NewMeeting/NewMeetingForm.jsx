import { useState } from "react";
import {
	Card,
	Button,
	Input,
	FormControl,
	FormLabel,
	Stack,
	Box,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	CloseButton,
	Textarea,
	useToast,
} from "@chakra-ui/react";
import useAPI from "../../../../hooks/useAPI";
// import {useAuthContext} from "./providers/auth";
import { useAuthContext } from "../../../../providers/auth";

// a function to determine if time is AM or PM
const getMeridiem = (time) => {
	time = time.split(":");
	const hours = time[0];
	const minutes = time[1];
	const amPm = hours >= 12 ? "PM" : "AM";
	return `${hours % 12}:${minutes} ${amPm}`;
};

const NewMeetingForm = ({ onMeetingCreated }) => {
	const authContext = useAuthContext();
	const [createMeeting, { loading }] = useAPI("/add-meeting");
	const [message, setMessage] = useState(null);
	const toast = useToast();

	const handleSubmittingForm = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		data["creator"] = authContext.authUser._id;
		data.date = new Date(data.date).getTime();
		data.start_time = getMeridiem(data.start_time);
		data.end_time = getMeridiem(data.end_time);
		const res = await createMeeting(data);
		toast({
			title: "Meeting Created.",
			description: "We've created your meeting for you.",
			status: "success",
			position: "top-right",
		});
		onMeetingCreated(res);
	};

	return (
		<Box w="full">
			<Card padding={10}>
				{message && (
					<Alert mb="4" status={message.type} variant="subtle">
						<AlertIcon />
						<AlertTitle textTransform="capitalize">
							{message.type}!
						</AlertTitle>
						<AlertDescription>{message.content}</AlertDescription>
						<CloseButton
							alignSelf="flex-start"
							position="absolute"
							right={1}
							top={1}
							onClick={() => setMessage(null)}
						/>
					</Alert>
				)}

				<form onSubmit={handleSubmittingForm}>
					<Stack spacing={4}>
						<FormControl w="full">
							<FormLabel>Meeting Title</FormLabel>
							<Input size="lg" type="text" name="title" />
						</FormControl>
						<FormControl w="full">
							<FormLabel>Meeting Agenda</FormLabel>
							<Textarea
								mt="2"
								name="agenda"
								placeholder="Enter your agenda here..."
							/>
						</FormControl>
						<FormControl w="2xl">
							<FormLabel>Meeting Date</FormLabel>
							<Input size="lg" type="date" name="date" />
						</FormControl>
						<FormControl w="2xl">
							<FormLabel>Meeting Start Time</FormLabel>
							<Input size="lg" type="time" name="start_time" />
						</FormControl>
						<FormControl w="2xl">
							<FormLabel>Meeting End Time</FormLabel>
							<Input size="lg" type="time" name="end_time" />
						</FormControl>
						<Box mt="1">
							<Button
								type="submit"
								size="lg"
								isLoading={loading}
								loadingText="Please wait (saving)..."
							>
								Save
							</Button>
						</Box>
					</Stack>
				</form>
			</Card>
		</Box>
	);
};

export default NewMeetingForm;
