"use client";
import React, { useEffect, useState, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { GET_USER_BY_TOKEN } from "@/graphql/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { CircleHelp, CirclePlus, Coffee, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icon";
import useSession from "@/hooks/use-session";
import ErrorDisplay from "@/components/ui/ErrorDisplay";
import PageGrid from "@/components/ui/pageGrid";
import Addfeature from "./Addfeature";
import AddEducation from "./Addeducation";
import { getInitials } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/toolKitTyped";
import { loadOrgs, selectOrg } from "@/store/orgSlice";
import { LIST_ALL_ORGS_BY_USER_QUERY } from "@/graphql/queries";
import EditEducation from "./Editeducation";
import EditFeature from "./Editfeature";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { UPDATE_USER_MUTATION } from '@/graphql/mutation';
import { DocumentNode } from 'graphql';
const educationData = [
  {
    degree: "Bachelor of Science in Computer Science",
    startDate: "September 2015",
    endDate: "June 2019",
    institute: "IIT Indore",
  },
  {
    degree: "Master of Science in Software Engineering",
    startDate: "September 2019",
    endDate: "June 2021",
    institute: "Manipal university",
  },
  {
    degree: "PhD in Artificial Intelligence",
    startDate: "September 2021",
    endDate: "Present",
    institute: "Indian Institute Of Technology Delhi",
  },
];
const cardData = [
  {
    companyName: "Company One NAME tech",
    description: "A brief description of Company One and its core mission.",
    skills: ["javascript", "blockchain", "Skill C"],
    startDate: "Jan 2018",
    endDate: "Dec 2020",
    responsibilities: ["Managed team projects."],
  },
  {
    companyName: "Company Two",
    description: "A brief description of Company Two and its core mission.",
    skills: ["Skill D", "Skill E", "Skill F"],
    startDate: "Feb 2021",
    endDate: "Nov 2022",
    responsibilities: ["Led product development."],
  },
  // {
  //   companyName: "Company Three",
  //   description: "A brief description of Company Three and its core mission.",
  //   skills: ["Skill G", "Skill H", "Skill I"],
  //   startDate: "Mar 2023",
  //   endDate: "Present",
  //   responsibilities: ["Directed strategic projects."],
  // },
];

// Define the Zod schema for validation
const profileSchema = z.object({
  id: z.string(),
  bio: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  discord: z.string().optional(),
   status: z.number().optional(),
});

type Schema = z.infer<typeof profileSchema>;

const UserProfile = () => {
  const { session } = useSession();
  const dispatch = useAppDispatch();
  const { orgs } = useAppSelector(selectOrg);

  const { loading: isLoadingOrgs } = useQuery(LIST_ALL_ORGS_BY_USER_QUERY, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      console.log({ listOrgs: data.listAllOrgsByUser });
      dispatch(loadOrgs(data.listAllOrgsByUser));
    },
  });

  const { data, loading, error } = useQuery(GET_USER_BY_TOKEN, {
    onCompleted: (data) => {
      setUser(data.getUserByToken);
    },
  });

  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const profileInfoRef = useRef<HTMLDivElement>(null);
  const editFormRef = useRef<HTMLDivElement>(null);

  const [updateUserMutation] = useMutation(UPDATE_USER_MUTATION);
  const {
    handleSubmit,
    control,
    clearErrors,
    formState: { errors },
    register,
    reset,
  } = useForm<Schema>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data: Schema) => {
    if (!session._id) {
      console.error("Session ID is undefined");
      return;
    }

    try {
      const { data: mutationData } = await updateUserMutation({
        variables: {
          _id: session._id,
          input: {
            status: data.status,
            github: data.github,
            bio: data.bio,
            discord: data.discord,
            linkedIn: data.linkedin,
             twitter: data.twitter,
          },
        },
      });
      setIsEditing(false);
      if (profileInfoRef.current && editFormRef.current) {
        profileInfoRef.current.classList.remove("hidden");
        editFormRef.current.classList.add("hidden");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditClick = () => {
    if (profileInfoRef.current && editFormRef.current) {
      profileInfoRef.current.classList.add("hidden");
      editFormRef.current.classList.remove("hidden");
      setIsEditing(true);
    }
  };

  const handleCancelClick = () => {
    if (profileInfoRef.current && editFormRef.current) {
      profileInfoRef.current.classList.remove("hidden");
      editFormRef.current.classList.add("hidden");
      setIsEditing(false);
      reset(user);
    }
  };

  const handleSaveClick = () => {
    handleSubmit(onSubmit)();
  };
  if (loading) return <PageGrid />;
  if (error) return <ErrorDisplay errorMessage={error.message} />;
  return (
    <div className="flex mt-12 mb-6 space-x-4 px-36">
      <div className="flex flex-col gap-4 w-1/3 ">
        <div className="flex flex-col justify-between items-center gap-2">
          <div className="flex flex-col justify-center items-center gap-1 border-slate-300 bg-card shadow-md mx-auto p-6 border rounded-md w-full max-w-md text-card-foreground">
            <div className="relative">
              <Avatar>
                <AvatarImage
                  src={"https://github.com/shadcn.png"}
                  className="rounded-full w-28 h-28"
                />
                <AvatarFallback>Avatar</AvatarFallback>
              </Avatar>
              {isEditing ? (
                <button
                  id="edit-button"
                  className="right-1 bottom-1 absolute bg-primary p-1 rounded-full text-primary-foreground"
                >
                  <Icons icon="mdi:pencil" />
                </button>
              ) : (
                <button
                  className={`right-2 bottom-1 absolute p-2 border-2 border-white rounded-full shadow-xl
         ${data?.getUserByToken.status === 0 ? "bg-red-700" : "bg-green-500"} 
         `}
                />
              )}
            </div>
            <div
              id="profile-info"
              ref={profileInfoRef}
              className={`mt-4 text-center ${isEditing ? "hidden" : ""}`}
            >
              <h2 className="font-semibold text-lg">
                {data?.getUserByToken.email || "Username"}
              </h2>
              <p className="text-muted-foreground">
                {data?.getUserByToken.bio || "No bio.."}
              </p>
            </div>
            <div
              id="edit-form"
              ref={editFormRef}
              className={`mt-4 w-full ${isEditing ? "" : "hidden"}`}
            >
              <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                {" "}
                <input
                  type="hidden"
                  {...register("id")}
                  defaultValue={user?.id}
                />
                <div className="mb-2">
                  <textarea
                    className="bg-input px-2 py-1 mt-1 border border-border rounded w-full text-slate-700 text-foreground"
                    rows={2}
                    placeholder="Add a bio..."
                    {...register("bio")}
                  />
                  {errors.bio && (
                    <span className="text-red-500 text-xs">
                      {errors.bio.message}
                    </span>
                  )}
                </div>
                <div className="flex justify-center items-center mb-2">
                  <Icons icon="mdi:github" className="mr-2 w-8 h-8" />
                  <Input
                    type="text"
                    className="bg-input px-2 py-1 mt-1 border border-border rounded w-full text-slate-700 text-foreground"
                    placeholder="https://github.com/username"
                    {...register("github")}
                  />
                  {errors.github && (
                    <span className="text-red-500 text-xs">
                      {errors.github.message}
                    </span>
                  )}
                </div>
                <div className="mb-2 flex items-center ">
                  <Icons
                    icon="hugeicons:user-status"
                    className=" text-slate-400 mr-2 w-8 h-8"
                  />

                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <select
                        id="status"
                        className="bg-input px-2 py-1.5 mt-1 border border-border rounded w-full text-slate-700 text-foreground"
                        {...field}
                        value={field.value?.toString()} // Ensure the value is a string for the select component
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        } // Convert the value back to a number on change
                      >
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                      </select>
                    )}
                  />

                  {errors.status && (
                    <span className="text-red-500 text-xs">
                      {errors.status.message}
                    </span>
                  )}
                </div>
                <div className="flex justify-center items-center mb-2">
                  <Icons
                    icon="mdi:linkedin"
                    className="mr-2 w-8 h-8 text-blue-900"
                  />
                  <Input
                    type="text"
                    placeholder="https://linkedin.com/in/username"
                    className="bg-input px-2 py-1 mt-1 border border-border rounded w-full text-slate-700 text-foreground"
                    {...register("linkedin")}
                  />
                  {errors.linkedin && (
                    <span className="text-red-500 text-xs">
                      {errors.linkedin.message}
                    </span>
                  )}
                </div>
                <div className="flex justify-center items-center mb-2">
                  <Icons
                    icon="mdi:twitter"
                    className="mr-2 w-8 h-8 text-blue-400"
                  />
                  <Input
                    type="text"
                    placeholder="https://twitter.com/username"
                    className="bg-input px-2 py-1 mt-1 border border-border rounded w-full text-slate-700 text-foreground"
                    {...register("twitter")}
                  />
                  {errors.twitter && (
                    <span className="text-red-500 text-xs">
                      {errors.twitter.message}
                    </span>
                  )}
                </div>
                <div className="flex justify-center items-center mb-2">
                  <Icons
                    icon="mdi:discord"
                    className="mr-2 w-8 h-8 text-[#5865F2]"
                  />
                  <Input
                    type="text"
                    placeholder="https://twitter.com/username"
                    className="bg-input px-2 py-1 mt-1 border border-border rounded w-full text-slate-700 text-foreground"
                    {...register("discord")}
                  />
                  {errors.discord && (
                    <span className="text-red-500 text-xs">
                      {errors.discord.message}
                    </span>
                  )}
                </div>
                 <div className="flex justify-center items-center mt-4">
                  <Button
                    id="cancel-button"
                    className="bg-slate-300 hover:bg-slate-400 shadow mx-2 px-4 py-1 rounded-md text-slate-900"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </Button>
                  <Button
                    id="save-button"
                    className="bg-primary px-4 py-1 rounded-md text-primary-foreground"
                    type="submit"
                    onClick={handleSaveClick}
                  >
                    Save
                  </Button>
                </div>
              </form>
            </div>
            {!isEditing && (
              <Button
                id="settings-button"
                className="bg-primary px-4 py-1 rounded-md w-full text-primary-foreground"
                onClick={handleEditClick}
              >
                Edit Profile
              </Button>
            )}
            <Button
              id="settings-button"
              className="bg-primary mt-1 px-4 py-1 rounded-md w-full text-primary-foreground"
            >
              Settings
            </Button>
          </div>

          <div className="flex flex-col gap-4 border-slate-300 shadow-md p-4 border rounded-md w-full  text-slate-400">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-md">
                <h1 className="font-semibold text-slate-400 text-sm">
                  REPUTATION SCORE
                </h1>
                <CircleHelp className="w-4 h-4 text-slate-400" />
              </div>{" "}
              <span>782</span>
            </div>
            <div className="flex flex-col text-md">
              <h1 className="font-semibold text-slate-400 text-sm">EARNINGS</h1>
              <span>$0.00</span>
            </div>
            <div className="flex flex-col text-md">
              <h1 className="font-semibold text-slate-400 text-sm">
                REVENUE SHARE
              </h1>
              <span>1.00%</span>
            </div>
          </div>
          <div className="flex flex-col gap-6 border-slate-300 shadow-lg p-4 border rounded-md w-full  text-slate-400">
            <div className="w-full">
              <h1 className="font-semibold text-slate-400 text-sm">
                ORGANIZATIONS
              </h1>
              {orgs.map(({ name, _id }) => (
                <Link
                  className="flex space-x-4 my-2 w-full"
                  href={`/orgs/org-overview/${_id}`}
                >
                  <div className="flex gap-2 border-2  shadow-lg p-2 rounded-md w-full">
                    <Avatar className="font-bold text-lg h-8 w-8 text-white p-1 rounded-full items-center justify-center flex cursor-pointer bg-primary">
                      {getInitials(name.slice(0, 1).toUpperCase())}
                    </Avatar>
                    <span className="flex items-center justify-center">
                      {name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2 mx-2 w-2/3">
       {/* <div className="flex flex-col justify-center border-slate-300 shadow-lg p-2 border rounded-md h-[18rem]">
          <h1 className="font-semibold text-lg text-slate-600">
            Featured work
          </h1>
          <div className="flex flex-col justify-center items-center border-slate-400 p-6 border border-dashed w-1/3 h-full text-center">
            <CirclePlus className="w-12 h-12 text-slate-900 cursor-pointer" />
            <span className="mt-4 font-semibold text-slate-500 text-sm">
              Feature work to show your experience
            </span>
          </div>
        </div> */}

        <div className="flex flex-col justify-center border-slate-300 shadow-md px-2 py-2  border rounded-md">
          <h1 className="font-semibold text-lg text-slate-600">
            Expierience And Skills
          </h1>
          <div className="flex space-x-2 overflow-hidden mt-1">
            {cardData.map((item, index) => (
              <div
                key={index}
                className="bg-card flex-col w-1/3 text-card-foreground rounded-lg border "
              >
                {" "}
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-card text-card-foreground p-4">
                  <div className="px-1 py-1 flex justify-between">
                    <span className=" mb-1 justify-between flex space-x-4 font-semibold text-md text-slate-700">
                      {item.companyName?.length > 12
                        ? item.companyName.substring(0, 12) + "..."
                        : item.companyName}
                    </span>
                    <EditFeature />
                  </div>
                  <div className=" pt-2 pb-1">
                    {item.skills.slice(0, 1).map((skill, index) => (
                      <span
                        key={index}
                        className="inline-block border border-primary/60  rounded-full px-3 py-1 text-sm font-semibold text-primary/80 mr-2 mb-2"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className=" pt-2 ">
                    <h3 className="font-medium text-sm text-slate-400 ">
                      Responsibilities
                    </h3>
                    <span className="text-sm">{item.responsibilities}</span>
                  </div>
                  <div className=" pt-2 text-slate-500">
                    <h3 className="font-medium text-sm text-slate-400 ">
                      Duration
                    </h3>
                    <p className="text-sm">
                      Start Date: <span className="">{item.startDate}</span>
                    </p>
                    <p className="text-sm">
                      End Date: <span className="">{item.endDate}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {cardData.length < 3 ? (
              <div className="flex flex-col justify-center items-center border-slate-400 p-6 border border-dashed w-1/3 h-full text-center">
                <Addfeature />
                <span className="mt-4 font-semibold text-slate-500 text-sm">
                  Feature work to show your experience
                </span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col border-slate-300 shadow-md p-4 border rounded-md max-h-[280px] min-h-[100px]">
          <span className="font-semibold justify-between flex text-lg text-slate-600">
            Education <AddEducation />
          </span>

          <div className="space-y-2 max-h-[250px] min-h-[100px] overflow-x-auto scrollbar-hide">
            <div className="flex space-x-2 min-w-max">
              {educationData.map((item, index) => (
                <div
                  key={index}
                  className="bg-card flex-col text-card-foreground p-2 rounded-lg border min-w-[200px]"
                >
                  <div className="flex justify-between space-x-4 items-center mb-4">
                    <div>
                      <p className="text-md font-semibold text-slate-700">
                        {item.institute?.length > 25
                          ? item.institute.substring(0, 25) + "..."
                          : item.institute}
                      </p>
                    </div>
                    <EditEducation />
                  </div>
                  <div className="text-slate-500 text-sm my-1">
                    {" "}
                    {item.degree?.length > 25
                      ? item.degree.substring(0, 25) + "..."
                      : item.degree}
                  </div>
                  <div className="space-y-2 text-slate-500">
                    <div>
                      <h3 className="text-sm">Start Date:</h3>
                      <p className="text-sm">{item.startDate}</p>
                    </div>
                    <div>
                      <h3 className="text-sm">End Date:</h3>
                      <p className="text-sm">{item.endDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col border-slate-300 bg-white shadow-lg p-2 border rounded-md">
          <p className="font-semibold text-lg text-slate-600">Contribution</p>
          <div className="flex flex-col justify-center items-center mt-4">
            <Coffee className="bg-secondary p-2 rounded-full w-16 h-16 text-slate-800 cursor-pointer" />
            <span className="text-md text-slate-400">
              No public tasks completed yet
            </span>
            <Link
              className="flex space-x-4 m-2 w-full justify-center items-center"
              href={`/dashboard`}
            >
              <Button className="bg-primary my-2 px-4 h-fit text-md">
                Explore open tasks
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
