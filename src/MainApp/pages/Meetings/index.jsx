import {
	Box,
	Card,
	CardBody,
	Text,
	Stack,
	AvatarGroup,
	Avatar,
	Heading,
	Flex,
	SimpleGrid,
	Spinner,
	Button,
} from "@chakra-ui/react";
import { format } from "date-fns";
import useAPI from "../../../hooks/useAPI";
import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Meetings = () => {
	const [getMeetings, { loading }] = useAPI("/meetings");
	const [meetings, setMeetings] = useState([]);

	useEffect(() => {
		getMeetings().then((data) => {
			setMeetings(data);
		});
	}, []);

	return (
		<Box p="6" minHeight="100%">
			<Button
				colorScheme="green"
				variant="outline"
				size="sm"
				leftIcon={<PlusIcon width="14" strokeWidth="2.5" />}
				mb="6"
			>
				New Meeting&nbsp;
			</Button>

			{loading && (
				<Flex alignItems="center" justifyContent="center" gap="3">
					<Spinner
						thickness="4px"
						speed="0.65s"
						emptyColor="green.200"
						color="green.500"
						size="lg"
					/>
					Loading meetings...
				</Flex>
			)}

			<SimpleGrid columns={2} gap={3}>
				{!loading &&
					meetings.map((meeting, index) => {
						return (
							<Card key={index}>
								<CardBody>
									<Heading size="md" mb="2.5">
										{meeting.title}
									</Heading>

									<Text mb="6" fontSize="md">
										{format(
											new Date(meeting.date),
											"EEEE, MMMM dd"
										)}{" "}
										&nbsp;&middot;&nbsp;{" "}
										{meeting.start_time} &mdash;{" "}
										{meeting.end_time}
									</Text>

									<Flex justifyContent="space-between">
										<Stack spacing={0}>
											<Box fontSize="sm" mb="1.5">
												Organiser
											</Box>
											<Stack direction="row">
												<Avatar
													size="sm"
													src={meeting.creator.avatar}
												/>
												<Box fontSize="sm" mt="1">
													{meeting.creator.name}
												</Box>
											</Stack>
										</Stack>

										<Stack spacing={0}>
											<Box fontSize="sm" mb="1.5">
												Attendees
											</Box>
											<AvatarGroup size="sm" max={8}>
												{meeting.attendees.map(
													(attendee, index) => {
														return (
															<Avatar
																name={
																	attendee.name
																}
																key={index}
																size="sm"
																src={
																	attendee.avatar
																}
															/>
														);
													}
												)}
											</AvatarGroup>
										</Stack>
									</Flex>
								</CardBody>
							</Card>
						);
					})}
			</SimpleGrid>
		</Box>
	);
};

export default Meetings;
