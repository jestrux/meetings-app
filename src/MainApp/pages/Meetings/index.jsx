import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import useAPI from "../../../hooks/useAPI";
import MeetingList from "./MeetingList";
import NewMeeting from "./NewMeeting";

const Meetings = () => {
	const [getMeetings, { loading }] = useAPI("/meetings");
	const [meetings, setMeetings] = useState([]);
	const [adding, setAdding] = useState(false);

	useEffect(() => {
		getMeetings().then((data) => {
			setMeetings(data);
		});
	}, []);

	return (
		<Box p="6" minHeight="100%">
			<Button
				colorScheme={adding ? "red" : "green"}
				variant="outline"
				size="sm"
				leftIcon={
					adding ? <XMarkIcon width="20" /> : <PlusIcon width="20" />
				}
				mb="6"
				onClick={() => setAdding(!adding)}
			>
				{adding ? "Reset" : "New Meeting"}
			</Button>

			{adding ? (
				<NewMeeting
					onMeetingCreated={(data) => {
						setMeetings([data, ...meetings]);
						setAdding(false);
					}}
				/>
			) : (
				<MeetingList loading={loading} meetings={meetings} />
			)}
		</Box>
	);
};

export default Meetings;
