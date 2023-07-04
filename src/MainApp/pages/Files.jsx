import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Box,
	Text,
	Flex,
	Spinner,
	Card, CardBody, Heading, Stack, StackDivider, CardFooter, SimpleGrid, Image
} from "@chakra-ui/react";
import { Link} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMeetingFiles } from "../../providers/api";
import { TrashIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/outline";

const Files = () => {
	const { isLoading: loading, data: files } = useQuery({
		queryKey: ["files"],
		queryFn: () => fetchMeetingFiles(),
	});

	console.log(files);
	console.log(loading);
	return (
		<Box p="6">
			<Breadcrumb separator="/">
				<BreadcrumbItem>
					<BreadcrumbLink to="/" as={Link}>
						App
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbItem>
					<span>Files</span>
				</BreadcrumbItem>
			</Breadcrumb>


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
			<SimpleGrid columns={3} gap={5}>
			{!loading && files.map((file, index) => {
				return (
					<Card key={index}
						direction={{ base: 'column', sm: 'row' }}
						overflow='hidden'
						variant='outline'
					>
						<Image
							objectFit='cover'
							maxW={{ base: '100%', sm: '200px' }}
							src={file.preview}
							alt=''
						/>

						<Stack>
							<CardBody>
								<Heading size='md'>{file.name}</Heading>

								{/* <Text py='2'>
									Caffè latte is a coffee beverage of Italian origin made with espresso
									and steamed milk.
								</Text> */}
							</CardBody>

							<CardFooter>
								<a target="_blank" href={file.url}>View</a>
							</CardFooter>
						</Stack>
					</Card>
					// <Box key={index}>
					// 	<Heading size='xs' textTransform='uppercase'>
					// 		{/* <DocumentTextIcon width={50} color="orange" /> */}
					// 		{file.name}
					// 	</Heading>
					// 	<Button flex='1' variant='ghost' leftIcon={<TrashIcon color="red" width={20} />}>
					// 		Delete
					// 	</Button>
					// 	<Button flex='1' variant='ghost' leftIcon={<ArrowsPointingOutIcon width={20} />}>
					// 		View
					// 	</Button>
					// </Box>
				);
			})
			}
				
			</SimpleGrid>
		</Box>

	);
};

export default Files;
