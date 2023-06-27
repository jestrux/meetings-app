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
} from "@chakra-ui/react";
import { format } from "date-fns";

const MeetingList = ({ loading, meetings }) => {
	return (
		<Box minHeight="100%" position="relative">
			{loading && (
				<Flex
					position="absolute"
					top="0"
					left="0"
					right="0"
					bottom="0"
					alignItems="center"
					justifyContent="center"
					bg="rgba(0,0,0,0.3)"
					zIndex="1000"
				>
					<Spinner
						thickness="4px"
						speed="0.65s"
						emptyColor="green.200"
						color="green.500"
						size="xl"
					/>
				</Flex>
			)}

			<SimpleGrid columns={2} gap={3}>
				{meetings.map((meeting, index) => {
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
									&nbsp;&middot;&nbsp; {meeting.start_time}{" "}
									&mdash; {meeting.end_time}
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
															name={attendee.name}
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

export default MeetingList;
