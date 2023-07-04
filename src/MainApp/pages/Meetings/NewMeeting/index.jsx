import { Box } from "@chakra-ui/react";

import NewMeetingForm from "./NewMeetingForm";

const NewMeeting = ({ onMeetingCreated }) => {
	return (
		<Box p="6">
			<NewMeetingForm onMeetingCreated={onMeetingCreated} />
		</Box>
	);
};

export default NewMeeting;
