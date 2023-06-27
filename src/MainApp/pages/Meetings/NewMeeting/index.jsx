import { Box } from "@chakra-ui/react";

import Attendees from "./Attendees";
import NewMeetingForm from "./NewMeetingForm";

const NewMeeting = ({ onMeetingCreated }) => {
	return (
		<Box>
			<NewMeetingForm onMeetingCreated={onMeetingCreated} />
		</Box>
	);
};

export default NewMeeting;
