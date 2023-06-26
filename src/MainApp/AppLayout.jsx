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
import { HomeIcon, CalendarIcon } from "@heroicons/react/20/solid";

const AppLayout = ({
	children,
	authUser,
	onLogout,
	onChangePage,
	currentPage,
}) => {
	return (
		<Box display="flex" bg="gray.100" style={{ height: "100vh" }}>
			<Box
				bg="white"
				borderRight="1px solid #eee"
				shadow
				width="300px"
				position="relative"
				zIndex="50px"
				p="3"
			>
				<Stack>
					<Button
						justifyContent="flex-start"
						variant={currentPage != "Dashboard" ? "ghost" : "solid"}
						leftIcon={<HomeIcon width="18px" />}
						onClick={() => onChangePage("Dashboard")}
					>
						Dashboard
					</Button>
					<Button
						justifyContent="flex-start"
						variant={
							currentPage != "New Meeting" ? "ghost" : "solid"
						}
						leftIcon={<CalendarIcon width="18px" />}
						onClick={() => onChangePage("New Meeting")}
					>
						New Meeting
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
					px="6"
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
							<MenuItem onClick={onLogout}>Logout</MenuItem>
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
