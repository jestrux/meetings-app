import {useEffect, useState} from "react";
import {
  Card,
  Button,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import {useMutation} from "@tanstack/react-query";
import {addMeeting} from "../../../../providers/api";
import {useNavigate} from "react-router-dom";

// import {useAuthContext} from "./providers/auth";

// a function to determine if time is AM or PM
const getTime = (time) => {
  time = time.replace(":", "");
  return time;
};

const NewMeetingForm = () => {
  const {
    isLoading: loading,
    data: response,
    mutateAsync,
  } = useMutation({
    mutationFn: addMeeting,
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmittingForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.date = new Date(data.date).toISOString().slice(0, 10);
    data.start_time = getTime(data.start_time);
    data.end_time = getTime(data.end_time);
    await mutateAsync(data);
    if (response?._id) {
      toast({
        title: "Meeting Created.",
        description: "We've created your meeting for you.",
        status: "success",
        position: "top-right",
      });
      navigate("/meetings", {replace: true});
    }
  };

  return (
    <Box w="full">
      <Card padding={10}>
        {message && (
          <Alert mb="4" status={message.type} variant="subtle">
            <AlertIcon />
            <AlertTitle textTransform="capitalize">{message.type}!</AlertTitle>
            <AlertDescription>{message.content}</AlertDescription>
            <CloseButton
              alignSelf="flex-start"
              position="absolute"
              right={1}
              top={1}
              onClick={() => setMessage(null)}
            />
          </Alert>
        )}

        <form onSubmit={handleSubmittingForm}>
          <Stack spacing={4}>
            <FormControl w="full">
              <FormLabel>Meeting Title</FormLabel>
              <Input size="lg" type="text" name="title" />
            </FormControl>
            <FormControl w="full">
              <FormLabel>Meeting Agenda</FormLabel>
              <Textarea
                mt="2"
                name="agenda"
                placeholder="Enter your agenda here..."
              />
            </FormControl>
            <FormControl w="2xl">
              <FormLabel>Meeting Date</FormLabel>
              <Input size="lg" type="date" name="date" />
            </FormControl>
            <FormControl w="2xl">
              <FormLabel>Meeting Start Time</FormLabel>
              <Input size="lg" type="time" name="start_time" />
            </FormControl>
            <FormControl w="2xl">
              <FormLabel>Meeting End Time</FormLabel>
              <Input size="lg" type="time" name="end_time" />
            </FormControl>
            <Box mt="1">
              <Button
                type="submit"
                size="lg"
                isLoading={loading}
                loadingText="Please wait (saving)..."
              >
                Save
              </Button>
            </Box>
          </Stack>
        </form>
      </Card>
    </Box>
  );
};

export default NewMeetingForm;
