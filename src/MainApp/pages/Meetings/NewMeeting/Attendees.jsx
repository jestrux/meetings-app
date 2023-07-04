import {
	Heading,
	HStack,
	Stack,
	Divider,
	Input,
	Button,
	Avatar,
	Box,
	Spinner,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const fakeDataUrl = `https://randomuser.me/api/?results=3&inc=name,email,picture&noinfo`;

const Attendees = () => {
	const [loading, setLoading] = useState(true);
	const [attendees, setAttendees] = useState([]);
	useEffect(() => {
		fetch(fakeDataUrl)
			.then((res) => res.json())
			.then((res) => {
				setLoading(false);
				setAttendees(res.results);
			});
	}, []);

	return (
		<div>
			<div>
				<Heading size="md">Meeting attendees</Heading>
				{loading && <Spinner />}

				<Stack spacing={3}>
					{attendees.map((item, index) => (
						<HStack key={index}>
							<Avatar src={item.picture.large} />
							<Stack>
								<Box>
									{item.name?.first} {item.name?.last}
								</Box>
							</Stack>
						</HStack>
					))}
				</Stack>
			</div>
			<Divider />
			<div>
				<Heading size="md">New attendee</Heading>

				<InputGroup>
					<Input
						placeholder="Enter attendee name"
						size="lg"
						name="newAttendee"
					/>
					<InputRightElement>
						<Button
							px="3"
							type="submit"
							mt="2"
							mr="2"
							variant="ghost"
						>
							Add
						</Button>
					</InputRightElement>
				</InputGroup>
			</div>
		</div>
	);
};
export default Attendees;
