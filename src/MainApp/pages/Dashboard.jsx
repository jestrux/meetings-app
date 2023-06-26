import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Box,
} from "@chakra-ui/react";

const Dashboard = () => {
	return (
		<Box p="6">
			<Breadcrumb separator="/">
				<BreadcrumbItem>
					<BreadcrumbLink href="#">App</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbItem>
					<BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
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

export default Dashboard;
