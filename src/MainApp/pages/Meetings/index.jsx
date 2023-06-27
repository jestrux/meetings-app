import { useEffect } from "react";
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
} from "@chakra-ui/react";

import { UserIcon } from "@heroicons/react/24/outline";
import useAPI from "../../../hooks/useAPI";

const Meetings = () => {
	const [getMeetings, { loading }] = useAPI("/meetings");

	return (
		<Box p="6">
			<SimpleGrid columns={2}>
				<Card>
					<CardBody>
						<Heading size="md" mb="2.5">
							IMIS Revamp Kickoff
						</Heading>

						<Text mb="6" fontSize="md">
							Tuesday, June 27 &nbsp;&middot;&nbsp; 7:00 AM
							&mdash; 8:00AM
						</Text>

						<Flex justifyContent="space-between">
							<Stack spacing={0}>
								<Box fontSize="sm" mb="1.5">
									Organiser
								</Box>
								<Stack direction="row">
									<Avatar
										size="sm"
										icon={<UserIcon width="18" />}
									/>
									<Box fontSize="sm" mt="1">
										Walter Kimaro
									</Box>
								</Stack>
							</Stack>

							<Stack spacing={0}>
								<Box fontSize="sm" mb="1.5">
									Attendees
								</Box>
								<AvatarGroup size="sm" max={8}>
									<Avatar
										name="Ryan Florence"
										src="https://bit.ly/ryan-florence"
									/>
									<Avatar
										name="Segun Adebayo"
										src="https://bit.ly/sage-adebayo"
									/>
									<Avatar
										name="Kent Dodds"
										src="https://bit.ly/kent-c-dodds"
									/>
									<Avatar
										name="Prosper Otemuyiwa"
										src="https://bit.ly/prosper-baba"
									/>
									<Avatar
										name="Christian Nwamba"
										src="https://bit.ly/code-beast"
									/>
								</AvatarGroup>
							</Stack>
						</Flex>
					</CardBody>
				</Card>
			</SimpleGrid>
		</Box>
	);
};

export default Meetings;
