import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	SimpleGrid,
	Box,
	Card,
	CardHeader,
	CardBody,
} from "@chakra-ui/react";

import Attendees from "./Attendees";

const NewMeeting = () => {
	return (
		<Box p="6">
			<Breadcrumb separator="/">
				<BreadcrumbItem>
					<BreadcrumbLink href="#">App</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbItem>
					<BreadcrumbLink href="#">New Meeting</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>

			<SimpleGrid columns={2} spacing={10}>
				<Box>
					<Card>
						<CardBody>
							<Attendees />
						</CardBody>
					</Card>
				</Box>

				<Box></Box>
			</SimpleGrid>
		</Box>
	);
};

export default NewMeeting;
