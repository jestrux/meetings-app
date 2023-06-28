import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AssignedActions = () => {
	return (
		<Box p="6">
			<Breadcrumb separator="/">
				<BreadcrumbItem>
					<BreadcrumbLink to="/" as={Link}>
						App
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbItem>
					<span>Assigned Actions</span>
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

export default AssignedActions;
