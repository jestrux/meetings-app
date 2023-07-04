import {
  Box,
  Card,
  CardBody,
  Text,
  Stack,
  AvatarGroup,
  Avatar,
  Heading,
  Flex,
  SimpleGrid,
  Spinner,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {format} from "date-fns";
import {PlusIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import {deleteMeeting, fetchMeetings} from "../../../providers/api";
import {ChevronDownIcon} from "@chakra-ui/icons";

const Meetings = () => {
  const {
    isLoading: loading,
    data: meetings,
    refetch,
  } = useQuery({
    queryKey: ["meetings"],
    queryFn: fetchMeetings,
  });

  const {mutateAsync: mutateDelete} = useMutation({
    mutationKey: ["deleteMeeting"],
    mutationFn: deleteMeeting,
  });

  return (
    <Box p="6" minHeight="100%">
      <Link to="add">
        <Button
          colorScheme="green"
          variant="outline"
          size="sm"
          leftIcon={<PlusIcon width="14" strokeWidth="2.5" />}
          mb="6"
        >
          New Meeting&nbsp;
        </Button>
      </Link>

      {loading && (
        <Flex alignItems="center" justifyContent="center" gap="3">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="green.200"
            color="green.500"
            size="lg"
          />
          Loading meetings...
        </Flex>
      )}

      <SimpleGrid columns={2} gap={5}>
        {!loading &&
          meetings &&
          meetings.map((meeting, index) => {
            return (
              <Box key={index} position={"relative"}>
                <Box position={"absolute"} right={3} top={3} zIndex={10}>
                  <Menu placement="left">
                    <MenuButton
                      as={Button}
                      variant="ghost"
                      rightIcon={<ChevronDownIcon />}
                    ></MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() => {
                          mutateDelete(meeting._id).then(() => {
                            refetch();
                          });
                        }}
                      >
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>

                <Link
                  to={meeting._id}
                  state={{meeting}}
                  style={{textDecoration: "none"}}
                >
                  <Card>
                    <CardBody>
                      <Heading size="md" mb="2.5">
                        {meeting.title}
                      </Heading>

                      <Text mb="6" fontSize="md">
                        {format(new Date(meeting.date), "EEEE, MMMM dd")}{" "}
                        &nbsp;&middot;&nbsp; {meeting.start_time} &mdash;{" "}
                        {meeting.end_time}
                      </Text>

                      <Flex justifyContent="space-between">
                        <Stack spacing={0}>
                          <Box fontSize="sm" mb="1.5">
                            Organiser
                          </Box>
                          <Stack direction="row">
                            <Avatar size="sm" src={meeting.creator.avatar} />
                            <Box fontSize="sm" mt="1">
                              {meeting.creator.name}
                            </Box>
                          </Stack>
                        </Stack>

                        <Stack spacing={0}>
                          <Box fontSize="sm" mb="1.5">
                            Attendees
                          </Box>
                          <AvatarGroup size="sm" max={8}>
                            {meeting.attendees.map((attendee, index) => {
                              return (
                                <Avatar
                                  name={attendee.name}
                                  key={index}
                                  size="sm"
                                  src={attendee.avatar}
                                />
                              );
                            })}
                          </AvatarGroup>
                        </Stack>
                      </Flex>
                    </CardBody>
                  </Card>
                </Link>
              </Box>
            );
          })}
      </SimpleGrid>
    </Box>
  );
};

export default Meetings;
