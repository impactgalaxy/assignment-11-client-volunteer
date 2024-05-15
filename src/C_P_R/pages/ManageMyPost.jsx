import useAuth from "../customHooks/useAuth"
import Loading from "../components/Loading";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Card, Image, CardBody, CardFooter, Text, Stack, Heading, Divider, ButtonGroup, Button } from '@chakra-ui/react'
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import useToast from "../customHooks/useToast";
import axios from "axios";


export default function ManageMyPost() {
    const Toast = useToast();

    const { user } = useAuth();


    const { data: volunteerPost = [], isLoading: loadingForPost, refetch } = useQuery({
        queryKey: ['postData', user?.email,],
        queryFn: () => volunteerNeedPostData()
    })


    const { data: volunteerReqData = [], isLoading: loadingForReq, refetch: reFetch } = useQuery({
        queryKey: ["requestData", user?.email,],
        queryFn: () => reqForVolunteerData(),

    })
    const volunteerNeedPostData = async () => {
        const response = await axios(`${import.meta.env.VITE_API_KEY}/volunteerSecure?email=${user?.email}`, { withCredentials: true })
        return response.data;
    }
    const reqForVolunteerData = async () => {
        const response = await axios(`${import.meta.env.VITE_API_KEY}/becomeVolunteer?email=${user?.email}`, { withCredentials: true })
        return response.data;
    }
    if (loadingForPost || loadingForReq) {
        return <Loading></Loading>
    }

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_API_KEY}/volunteer/${_id}`)
                    .then(response => {
                        if (response.data.deletedCount > 0) {
                            Toast.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            })
                            refetch();
                        }
                    })
                    .catch(error => {
                        Toast.fire({
                            icon: "error",
                            title: error.message
                        })
                    })

            }
        });
    }
    //handle cancel
    const handleCancel = async (id, organizationEmail) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`${import.meta.env.VITE_API_KEY}/becomeVolunteer/${id}?organizationEmail=${organizationEmail}`)
                    if (response.data.deletedCount > 0) {
                        Toast.fire({
                            icon: "success",
                            title: "Successful!",
                            text: "Your request cancel"
                        })
                        reFetch()
                    }
                } catch (error) {
                    Toast.fire({
                        icon: "error",
                        title: error.message
                    });
                }
            }

        })

    }
    return (
        <div>
            <Helmet>
                <title>
                    Manage my post
                </title>
            </Helmet>
            <Tabs isFitted variant='enclosed'>
                <TabList mb='1em'>
                    <Tab>My need volunteer</Tab>
                    <Tab>I&apos;m volunteer of</Tab>
                </TabList>
                <TabPanels>

                    <TabPanel>
                        {volunteerPost.length === 0 && <div className="text-center text-3xl p-10">No data found</div>}
                        {
                            volunteerPost.map(post => {
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

                                        <Stack className="p-4">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-start gap-4">
                                                <div>
                                                    <Heading size='md'>{post.title}</Heading>

                                                    <Text py='2'>
                                                        {post.description}
                                                    </Text>
                                                </div>
                                                <div className="text-center">
                                                    <Heading size="md">Volunteer</Heading>

                                                    {
                                                        Object.prototype.hasOwnProperty.call(post, "volunteerInfo") ?
                                                            <CardBody>
                                                                <Text>{post?.volunteerInfo?.name}</Text>
                                                                <Text>{post?.volunteerInfo?.email}</Text>
                                                                <Text>{post?.volunteerInfo?.status}</Text>
                                                            </CardBody> :
                                                            <Heading size="xm">No Volunteer yet add</Heading>
                                                    }
                                                </div>

                                            </div>

                                            <CardFooter className="space-x-5">
                                                <Button variant='solid' colorScheme='red' onClick={() => handleDelete(post._id)}>
                                                    Delete
                                                </Button>
                                                <Link
                                                    className=""
                                                    to={`/update-volunteer-need-post/${post._id}`}><Button variant='solid' colorScheme='blue'>Update</Button></Link>

                                            </CardFooter>
                                        </Stack>
                                    </Card>
                                )
                            })
                        }


                    </TabPanel>

                    <TabPanel>
                        {volunteerReqData.length === 0 && <div className="text-center text-3xl p-10">No data found</div>}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">

                            {volunteerReqData.map((item, idx) => {
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
                                                <Button onClick={() => handleCancel(item._id, item.organizationEmail)} variant='solid' colorScheme='blue'>
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
