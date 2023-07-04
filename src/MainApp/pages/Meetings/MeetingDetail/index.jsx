import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Box,
	Card,
	CardHeader,
	CardBody,
	Stack,
	Heading,
	StackDivider,
	Text,
	List,
	ListItem,
	ListIcon,
	OrderedList,
	UnorderedList,
	Grid,
	GridItem,
	Flex,
	Avatar,
	Badge,
  } from "@chakra-ui/react";
  import { Link, useLocation, useParams } from "react-router-dom";
  
  const MeetingDetail = () => {
	const { state } = useLocation();
	const { meetingId } = useParams();
  
	console.log(state.meeting.actions);
  
	// if (state) {
	// 	if (state.meeting) {
	// 		console.log("STATE MEETING AVAILABLE");
	// 	}else{
	// 		console.log("STATE MEETING NOT AVAILABLE");
	// 	}
	// }else{
	// 	console.log("STATE NOT AVAILABLE");
	// }
  
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
  
		<Card>
		  <CardHeader>
			<Heading size="md">Title: {state?.meeting?.title}</Heading>
		  </CardHeader>
  
		  <CardBody>
			<Stack divider={<StackDivider />} spacing="4">
			  {state.meeting.agenda ? (
				<Box>
				  <Heading size="xs" textTransform="uppercase">
					Agenda:
				  </Heading>
				  <Text pt="2" fontSize="sm">
					<span>{state?.meeting?.agenda}</span>
				  </Text>
				</Box>
			  ) : (
				<p>No Agenda for this Meeting</p>
			  )}
  
			  {state.meeting.attendees ? (
				<Box>
				  <Heading size="xs" textTransform="uppercase">
					Attendees:
				  </Heading>
				  <Text pt="2" fontSize="sm">
					<OrderedList>
					  {state.meeting.attendees.map((attendee) => {
						return (
						  <ListItem key={attendee._id}>{attendee.name}</ListItem>
						);
					  })}
					</OrderedList>
				  </Text>
				</Box>
			  ) : (
				<p>No attendies For this Meeting</p>
			  )}
  
			  <Box>
				<Heading size="xs" textTransform="uppercase">
				  Files:
				</Heading>
  
				{state.meeting.files.length > 0 ? (
				  <Grid templateColumns="repeat(5, 1fr)" gap={6}>
					{state.meeting.files.map((fileObj) => {
					  return (
						<a href={fileObj.url} key={fileObj._id}>
						  <Card>
							<CardBody>{fileObj.name}</CardBody>
						  </Card>
						</a>
					  );
					})}
				  </Grid>
				) : (
				  <Text>No File Found</Text>
				)}
			  </Box>
  
			  <Box>
				<Heading size="xs" textTransform="uppercase">
				  Actions:
				</Heading>
				{state.meeting.actions.map((action) => {
				  return (
					<Flex key={action._id}>
					  <Avatar src={action.assignee?.avatar} />
					  <Box ml="3">
						<Text fontWeight="bold">
						  {action.title}
						  <Badge ml="1" colorScheme="green">
							{action.assignee?.name}
						  </Badge>
						</Text>
						<Text fontSize="sm">{action.due_date}</Text>
					  </Box>
					</Flex>
				  );
				})}
			  </Box>
  
			  {/* <Box>
				
  
				<div>
				  {state.meeting.actions.map((assignee) => {
					return <p key={assignee._id}>{assignee._id}</p>;
				  })}
				</div>
			  </Box> */}
			</Stack>
		  </CardBody>
		</Card>
	  </Box>
	);
  };
  
  export default MeetingDetail;
  