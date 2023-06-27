import {
	Box,
	Heading,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Button,
	Avatar,
	Stack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
	HomeIcon,
	CalendarIcon,
	ClockIcon,
	DocumentIcon,
} from "@heroicons/react/24/outline";
import { useAuthContext } from "../providers/auth";

const AppLayout = ({ children, onChangePage, currentPage }) => {
	const { authUser, logout } = useAuthContext();
	return (
		<Box display="flex" bg="gray.100" style={{ height: "100vh" }}>
			<Box
				bg="white"
				borderRight="1px solid #eee"
				shadow
				width="300px"
				position="relative"
				zIndex="50px"
			>
				<Box
					display="flex"
					alignItems="flex-end"
					height="120px"
					bg="green.700"
					color="white"
					py="3.5"
					px="5"
					mb="1"
				>
					<Heading size="md">NIC Meetings</Heading>
				</Box>
				<Stack p="3">
					<Button
						justifyContent="flex-start"
						color={
							currentPage == "Dashboard"
								? "green.700"
								: "gray.500"
						}
						variant={currentPage == "Dashboard" ? "solid" : "ghost"}
						leftIcon={<HomeIcon width="18px" />}
						onClick={() => onChangePage("Dashboard")}
					>
						<Box ml="2">Dashboard</Box>
					</Button>

					<Button
						justifyContent="flex-start"
						color={
							currentPage == "Meetings" ? "green.700" : "gray.500"
						}
						variant={currentPage == "Meetings" ? "solid" : "ghost"}
						leftIcon={<CalendarIcon width="18px" />}
						onClick={() => onChangePage("Meetings")}
					>
						<Box ml="2">Meetings</Box>
					</Button>
					<Button
						justifyContent="flex-start"
						color={
							currentPage == "Pending Actions"
								? "green.700"
								: "gray.500"
						}
						variant={
							currentPage == "Pending Actions" ? "solid" : "ghost"
						}
						leftIcon={<ClockIcon width="18px" />}
						onClick={() => onChangePage("Pending Actions")}
					>
						<Box ml="2">Pending Actions</Box>
					</Button>
					<Button
						justifyContent="flex-start"
						color={
							currentPage == "Files" ? "green.700" : "gray.500"
						}
						variant={currentPage == "Files" ? "solid" : "ghost"}
						leftIcon={<DocumentIcon width="18px" />}
						onClick={() => onChangePage("Files")}
					>
						<Box ml="2">Files</Box>
					</Button>
				</Stack>
			</Box>
			<Box
				flex="1"
				display="flex"
				flexDirection="column"
				height="100vh"
				position="relative"
				zIndex="50px"
			>
				<Box
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					flexShrink="0"
					height="16"
					bg="white"
					pl="6"
					pr="2"
					borderBottom="1px solid #eee"
				>
					<Heading size="md" lineHeight="none">
						{currentPage}
					</Heading>

					<Menu>
						<MenuButton
							as={Button}
							variant="ghost"
							rightIcon={<ChevronDownIcon />}
						>
							<Box display="flex" alignItems="center" gap="2">
								<Avatar
									size="sm"
									name={authUser.name}
									src={authUser.avatar}
								/>
								{authUser.name}
							</Box>
						</MenuButton>
						<MenuList>
							<MenuItem onClick={logout}>Logout</MenuItem>
						</MenuList>
					</Menu>
				</Box>
				<Box flex={1} overflow="auto">
					{children}
				</Box>
			</Box>
		</Box>
	);
};

export default AppLayout;
