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
	Input,
	InputGroup,
	InputLeftElement,
	IconButton,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
	HomeIcon,
	CalendarIcon,
	ClockIcon,
	DocumentIcon,
	MagnifyingGlassIcon,
	ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { useAuthContext } from "../providers/auth";
import { Link, useMatch } from "react-router-dom";
import { useAppContext } from "../providers/app";

const SidebarLink = ({ url, icon, label }) => {
	const match = useMatch(url);
	const active = Boolean(match);

	return (
		<Link to={url}>
			<Button
				w="full"
				justifyContent="flex-start"
				color={active ? "green.700" : "gray.500"}
				variant={active ? "solid" : "ghost"}
				leftIcon={icon}
			>
				<Box ml="2">{label}</Box>
			</Button>
		</Link>
	);
};

const AppLayout = ({ children }) => {
	const { authUser, logout } = useAuthContext();
	const { pageTitle, backUrl } = useAppContext();

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
					<SidebarLink
						url="/"
						icon={<HomeIcon width="18px" />}
						label="Dashboard"
					/>

					<SidebarLink
						url="/meetings"
						icon={<CalendarIcon width="18px" />}
						label="Meetings"
					/>

					<SidebarLink
						url="/files"
						icon={<DocumentIcon width="18px" />}
						label="Files"
					/>

					<SidebarLink
						url="/actions"
						icon={<ClockIcon width="18px" />}
						label="Assigned Actions"
					/>
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
					<Box w="180px" display="flex" alignItems="center" gap="2.5">
						{backUrl?.length > 0 && (
							<Link to={backUrl}>
								<IconButton
									icon={<ChevronLeftIcon width="20" />}
								/>
							</Link>
						)}
						<Heading mt="1" size="md" lineHeight="none">
							{pageTitle}
						</Heading>
					</Box>

					<Box
						h="full"
						display="flex"
						flex="1"
						alignItems="center"
						justifyContent="center"
						mx="4"
					>
						<Box w="full" maxW="md">
							<InputGroup>
								<InputLeftElement opacity="0.4">
									<MagnifyingGlassIcon width="20" />
								</InputLeftElement>

								<Input
									shadow="sm"
									placeholder="Search for meetings, files and assigned actions..."
									_placeholder={{
										color: "black",
										opacity: "0.4",
									}}
								/>
							</InputGroup>
						</Box>
					</Box>

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
