"use client";
import React, { useEffect, useState, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import {
  GET_USER_BY_TOKEN,
  LIST_ALL_ORGS_BY_USER_QUERY,
} from "@/graphql/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { CircleHelp, CirclePlus, Coffee } from "lucide-react";
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
import { setUser, updateUser } from "@/store/UserSlice";
import EditEducation from "./Editeducation";
import EditFeature from "./Editfeature";
import Updateuser from "./updateuser";

const UserProfile = () => {
  const { session } = useSession();
  const dispatch = useAppDispatch();
  const { orgs } = useAppSelector(selectOrg);
  const user = useAppSelector((state) => state.UserSlice.user);

  const { loading: isLoadingOrgs } = useQuery(LIST_ALL_ORGS_BY_USER_QUERY, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      console.log({ listOrgs: data.listAllOrgsByUser });
      dispatch(loadOrgs(data.listAllOrgsByUser as any));
    },
  });

  const { data, loading, error } = useQuery(GET_USER_BY_TOKEN, {
    onCompleted: (data) => {
      dispatch(setUser(data.getUserByToken as any));
    },
  });

  const featureData = user?.featureWork?.map((obj: any, index: number) => ({
    ...obj,
    id: index + 1,
  }));

  const educationData = user?.education?.map((obj: any, index: number) => ({
    ...obj,
    id: index + 1,
  }));

  if (loading) return <PageGrid />;
  if (error) return <ErrorDisplay errorMessage={error.message} />;
  return (
    <div className="flex mt-12 mb-6 space-x-4 px-36">
      <div className="flex flex-col gap-4 w-1/3 ">
        <div className="flex flex-col justify-between items-center gap-2">
          <Updateuser />
          <div className="flex flex-col gap-4 border-slate-300 shadow-md p-4 border rounded-md w-full  text-slate-400">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-md">
                <h1 className="font-semibold text-slate-400 text-sm">
                  REPUTATION SCORE
                </h1>
                <CircleHelp className="w-4 h-4 text-slate-400" />
              </div>{" "}
              <span> {user.reputationScore}</span>
            </div>
            <div className="flex flex-col text-md">
              <h1 className="font-semibold text-slate-400 text-sm">EARNINGS</h1>
              <span>$ {user.earnings}</span>
            </div>
            <div className="flex flex-col text-md">
              <h1 className="font-semibold text-slate-400 text-sm">
                REVENUE SHARE
              </h1>
              <span>{user.revenueShare} %</span>
            </div>
          </div>
          <div className="flex flex-col gap-6 border-slate-300 shadow-lg p-4 border rounded-md w-full  text-slate-400">
            <div className="w-full">
              <h1 className="font-semibold text-slate-400 text-sm">
                ORGANIZATIONS
              </h1>
              {orgs.map(({ name, _id }) => (
                <Link
                  key={_id}
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
        <div className="flex flex-col justify-center border-slate-300 shadow-md px-2 py-2  border rounded-md">
          <h1 className="font-semibold text-lg text-slate-600">
            Expierience And Skills
          </h1>
          <div className="flex space-x-2 overflow-hidden mt-1">
            {user?.featureWork &&
              user.featureWork.length > 0 &&
              user.featureWork.map((item: any, index: number) => (
                <div
                  key={index}
                  className="bg-card flex-col w-1/3 text-card-foreground rounded-lg border "
                >
                  <div className="max-w-sm rounded overflow-hidden shadow-lg bg-card text-card-foreground p-4">
                    <div className="px-1 py-1 flex justify-between">
                      <span className="mb-1 justify-between flex space-x-4 font-semibold text-md text-slate-700">
                        {typeof item.company === "string" && (
                          <span className="mb-1 justify-between flex space-x-4 font-semibold text-md text-slate-700">
                            {item.company.length > 12
                              ? item.company.substring(0, 12) + "..."
                              : item.company}
                          </span>
                        )}
                      </span>
                      <EditFeature Data={featureData} index={index} />
                    </div>
                    <div className="pt-2 pb-1">
                      {item.skills.length > 0 ? (
                        item.skills
                          .slice(0, 1)
                          .map((skill: any, index: any) => (
                            <span
                              key={index}
                              className="inline-block border border-primary/60 rounded-full px-3 py-1 text-sm font-semibold text-primary/80 mr-2 mb-2"
                            >
                              {skill}
                            </span>
                          ))
                      ) : (
                        <span className="inline-block border border-primary/60 rounded-full px-3 py-1 text-sm font-semibold text-primary/80 mr-2 mb-2">
                          <p> + Skills</p>
                        </span>
                      )}
                    </div>
                    <div className="pt-2">
                      <h3 className="font-medium text-sm text-slate-400">
                        Position
                      </h3>
                      <span className="text-sm">{item.position || ""}</span>
                    </div>
                    <div className="pt-2 text-slate-500">
                      <h3 className="font-medium text-sm text-slate-400">
                        Duration
                      </h3>
                      <p className="text-sm">
                        Start Date:{" "}
                        <span className="">
                          {new Date(item.startDate).toLocaleDateString("en-GB")}
                        </span>
                      </p>
                      <p className="text-sm">
                        End Date:{" "}
                        <span className="">
                          {new Date(item.endDate).toLocaleDateString("en-GB")}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}

            {user?.featureWork && user.featureWork.length < 3 ? (
              <div className="flex flex-col justify-center items-center border-slate-400 p-6 border border-dashed w-1/3  text-center">
                <Addfeature />
                <span className="mt-4 font-semibold text-slate-500 text-sm">
                  Feature your Work Expierience and Skills
                </span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col border-slate-300 shadow-md p-4 border rounded-md max-h-[280px] min-h-[100px]">
          <span className="flex justify-between">
          <span className="font-semibold text-lg text-slate-600">
            Education
          </span>
          <span>
            {" "}
            <AddEducation />
          </span>
          </span>
          <div className="space-y-2 max-h-[250px] min-h-[100px] overflow-x-auto scrollbar-hide">
            <div className="flex space-x-2 min-w-max ">
              {user?.education && user.education.length > 0 ? (
                <div className="flex space-x-4">
                  {user.education.map(
                    (
                      item: {
                        institute: string;
                        degree: string;
                        startDate: string;
                        endDate: string;
                      },
                      index: number
                    ) => (
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
                          <EditEducation Data={educationData} index={index} />
                        </div>
                        {typeof item.degree === "string" && (
                          <div className="text-slate-600 text-sm my-1">
                            {item.degree?.length > 25
                              ? item.degree.substring(0, 25) + "..."
                              : item.degree}
                          </div>
                        )}
                        <div className="space-y-2 text-slate-500">
                          <p className="text-sm">
                            Start Date:{" "}
                            <span className="">
                              {new Date(item.startDate).toLocaleDateString(
                                "en-GB"
                              )}
                            </span>
                          </p>
                          <p className="text-sm">
                            End Date:{" "}
                            <span className="">
                              {new Date(item.endDate).toLocaleDateString(
                                "en-GB"
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="bg-card text-card-foreground p-2 rounded-lg  min-w-[200px]">
                  <p className="text-md font-semibold text-slate-700">
                    Add your education to get more oppourtunity
                  </p>
                </div>
              )}
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
