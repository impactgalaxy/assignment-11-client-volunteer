import useAuth from "../customHooks/useAuth";
import Loading from "../components/Loading";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  CardFooter,
  Text,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";

import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import useToast from "../customHooks/useToast";
import axios from "axios";

export default function ManageMyPost() {
  const Toast = useToast();

  const { user } = useAuth();

  const {
    data: volunteerPost = [],
    isLoading: loadingForPost,
    refetch,
  } = useQuery({
    queryKey: ["postData", user?.email],
    queryFn: () => volunteerNeedPostData(),
  });

  const {
    data: volunteerReqData = [],
    isLoading: loadingForReq,
    refetch: reFetch,
  } = useQuery({
    queryKey: ["requestData", user?.email],
    queryFn: () => reqForVolunteerData(),
  });
  const volunteerNeedPostData = async () => {
    const response = await axios(
      `${import.meta.env.VITE_API_KEY}/volunteerSecure?email=${user?.email}`,
      { withCredentials: true }
    );
    return response.data;
  };
  const reqForVolunteerData = async () => {
    const response = await axios(
      `${import.meta.env.VITE_API_KEY}/becomeVolunteer?email=${user?.email}`,
      { withCredentials: true }
    );
    return response.data;
  };
  if (loadingForPost || loadingForReq) {
    return <Loading></Loading>;
  }

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_API_KEY}/volunteer/${_id}`)
          .then((response) => {
            if (response.data.deletedCount > 0) {
              Toast.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((error) => {
            Toast.fire({
              icon: "error",
              title: error.message,
            });
          });
      }
    });
  };
  //handle cancel
  const handleCancel = async (id, organizationEmail) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${
              import.meta.env.VITE_API_KEY
            }/becomeVolunteer/${id}?organizationEmail=${organizationEmail}&user=${
              user?.email
            }`
          );
          if (response.data.deletedCount > 0) {
            Toast.fire({
              icon: "success",
              title: "Successful!",
              text: "Your request cancel",
            });
            reFetch();
          }
        } catch (error) {
          Toast.fire({
            icon: "error",
            title: error.message,
          });
        }
      }
    });
  };
  console.log(volunteerPost);
  return (
    <div>
      <Helmet>
        <title>Manage my post</title>
        <meta name="description" content="This is a manage my post route." />
      </Helmet>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>My need volunteer</Tab>
          <Tab>I&apos;m volunteer of</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {volunteerPost.length === 0 && (
              <div className="text-center text-3xl p-10">No data found</div>
            )}
            {volunteerPost.map((post) => {
              return (
                <section
                  key={post._id}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
                  <div>
                    <img src={post.photo} alt="" className="w-56 h-56" />
                    <h1>{post.title}</h1>
                    <h1>{post.description}</h1>
                    <button className="btn btn-primary mx-10">
                      <Link to={`/update-volunteer-need-post/${post._id}`}>
                        Update
                      </Link>
                    </button>
                    <button className="btn btn-warning" onClick={handleDelete}>
                      Delete
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 ">
                    <h1>Volunteer</h1>
                    <div>
                      {post?.volunteerInfo &&
                        post?.volunteerInfo.map((info, idx) => {
                          return (
                            <div key={info._id} className="border p-2">
                              <p>{idx + 1}</p>
                              <p>{info?.name}</p>
                              <p>{info?.email}</p>
                              <p>{info?.status}</p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </section>
              );
            })}
          </TabPanel>

          <TabPanel>
            {volunteerReqData.length === 0 && (
              <div className="text-center text-3xl p-10">No data found</div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
              {volunteerReqData.map((item, idx) => {
                return (
                  <Card maxW="sm" key={idx}>
                    <div>
                      <div>
                        <h1>{item.title}</h1>
                        <p>{item.category}</p>
                        <p>{item.location}</p>
                      </div>
                    </div>
                    <Divider />
                    <div>
                      <p>Owner name: {item.organizationName}</p>
                      <p>Owner email: {item.organizationEmail}</p>
                    </div>
                    <Divider></Divider>
                    <div>
                      <div>
                        <Button
                          onClick={() =>
                            handleCancel(item._id, item.organizationEmail)
                          }
                          variant="solid"
                          colorScheme="blue">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
