import useAuth from "../customHooks/useAuth"
import useAxiosSecret from "../customHooks/useAxiosSecret";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Card, Image, CardBody, CardFooter, Text, Stack, Heading, Divider, ButtonGroup, Button } from '@chakra-ui/react'


export default function ManageMyPost() {
    const [myData, setMyData] = useState([]);
    const axiosSecret = useAxiosSecret();
    const [posted, setPosted] = useState([])

    const { user } = useAuth();
    useEffect(() => {
        axiosSecret.get(`/becomeVolunteer?email=${user?.email}`)
            .then(data => setMyData(data.data))
    }, [user?.email, axiosSecret]);

    useEffect(() => {
        axiosSecret.get(`/volunteerSecure?email=${user?.email}`)
            .then(res => setPosted(res.data))
            .catch(error => {
                console.log(error);
            })
    }, [axiosSecret, user?.email])

    if (myData.length === 0 || posted.length === 0) {
        return <Loading></Loading>
    }
    console.log("posted data", posted, "me volunteer", myData);
    return (
        <div>
            <Tabs isFitted variant='enclosed'>
                <TabList mb='1em'>
                    <Tab>My need volunteer</Tab>
                    <Tab>I&apos;m volunteer of</Tab>
                </TabList>
                <TabPanels>

                    <TabPanel>
                        {posted.map(post => {
                            return (
                                <Card
                                    key={post._id}
                                    direction={{ base: 'column', sm: 'row' }}
                                    overflow='hidden'
                                    variant='outline'
                                    className="mb-5"
                                >
                                    <Image
                                        objectFit='cover'
                                        maxW={{ base: '100%', sm: '200px' }}
                                        src={post.photo}
                                        alt='Caffe Latte'
                                    />

                                    <Stack>
                                        <CardBody>
                                            <Heading size='md'>{post.title}</Heading>

                                            <Text py='2'>
                                                {post.description}
                                            </Text>
                                        </CardBody>

                                        <CardFooter className="space-x-5">
                                            <Button variant='solid' colorScheme='blue' className="bg-warning">
                                                Delete
                                            </Button>
                                            <Button variant='solid' colorScheme='blue'>
                                                Update
                                            </Button>
                                        </CardFooter>
                                    </Stack>
                                </Card>
                            )
                        })}
                    </TabPanel>
                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                            {myData.map((item, idx) => {
                                return (
                                    <Card maxW='sm' key={idx}>
                                        <CardBody>

                                            <Stack mt='6' spacing='3'>
                                                <Heading size='md'>{item.title}</Heading>
                                                <Text>
                                                    {item.category}
                                                </Text>
                                                <Text color='blue.600' fontSize='2xl'>
                                                    {item.location}
                                                </Text>
                                            </Stack>
                                        </CardBody>
                                        <Divider />
                                        <CardBody>
                                            <Text>
                                                Owner name: {item.organizationName}
                                            </Text>
                                            <Text>
                                                Owner email: {item.organizationEmail}
                                            </Text>
                                        </CardBody>
                                        <Divider></Divider>
                                        <CardFooter>
                                            <ButtonGroup spacing='2'>
                                                <Button variant='solid' colorScheme='blue'>
                                                    Cancel
                                                </Button>

                                            </ButtonGroup>
                                        </CardFooter>
                                    </Card>
                                )
                            })
                            }
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </div>
    )
}
