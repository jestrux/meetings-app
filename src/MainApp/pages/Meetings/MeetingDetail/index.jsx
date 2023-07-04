import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Box,
} from "@chakra-ui/react";
import { Link, useLocation, useParams } from "react-router-dom";

const MeetingDetail = () => {
	const { state } = useLocation();
	const { meetingId } = useParams();

	return (
		<Box p="6">
			<Breadcrumb separator="/">
				<BreadcrumbItem>
					<BreadcrumbLink to="/" as={Link}>
						App
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbItem>
					<BreadcrumbLink to="/meetings" as={Link}>
						Meetings
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbItem>
					<span>{state?.meeting?.title || meetingId}</span>
				</BreadcrumbItem>
			</Breadcrumb>

			<div
				style={{
					padding: 24,
					minHeight: 360,
				}}
			></div>
		</Box>
	);
};

export default MeetingDetail;
