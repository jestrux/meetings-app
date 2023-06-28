import { Breadcrumb, BreadcrumbItem, Box } from "@chakra-ui/react";

const Dashboard = () => {
	return (
		<Box p="6">
			<Breadcrumb separator="/">
				<BreadcrumbItem>
					<span>App</span>
				</BreadcrumbItem>
				<BreadcrumbItem>
					<span>Dashboard</span>
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
