"use client";
import React, { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { useParams } from "next/navigation";
import { GET_TASK_QUERY } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import SubmitTaskForm from "@/components/ui/modals/SubmittaskForm";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { CrossIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Taskdetails: React.FC = () => {
  const params = useParams<{ taskId: string }>();

  const [taskData, setTaskData] = useState({
    name: "No task name",
    description: "No task description",
    skills: ["No task skills"],
    assignee: "Pawan Kumar",
    reviewer: "Rahul",
    acceptanceCriteria: "No task acceptance criteria",
    status: "No task status",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllActivity, setShowAllActivity] = useState<boolean>(false);
  const [submitFormOpen, setSubmitFormOpen] = useState<boolean>(false);

  const {
    loading: loadingTask,
    error: errorTask,
    data: dataTask,
  } = useQuery(GET_TASK_QUERY, {
    variables: { _id: params.taskId },
    onCompleted: () => {
      setLoading(false);
    },
  });

  useEffect(() => {
    console.log("data->", dataTask?.getTask);
    setTaskData(dataTask?.getTask as any);
  }, [loadingTask, errorTask, dataTask]);

  const toggleShowAll = () => {
    setShowAllActivity((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!taskData) {
    return null;
  }

  return (
    <>
      {submitFormOpen && (
        <Dialog open={true}>
          <div className="fixed inset-0 bg-black opacity-30 z-10"></div>
          <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform p-4 lg:w-full w-[80vw] max-w-5xl rounded-lg  bg-background shadow-lg z-20">
            <DialogTitle className="text-center">Add Task</DialogTitle>
            <DialogClose asChild>
              <Button
                variant={"ghost"}
                className="absolute right-4 top-2 text-muted-foreground text-xs"
                onClick={() => setSubmitFormOpen(false)}
              >
                <CrossIcon className="w-4 h-4 rotate-45 hover:text-red-500" />
              </Button>
            </DialogClose>

            <SubmitTaskForm taskId="" handlePostSubmit={() => {}} />
          </DialogContent>
        </Dialog>
      )}
      <div className="flex flex-col lg:flex-row gap-2 p-2 pb-4  border bg-card text-card-foreground ">
        <div className="flex-1 border p-4 rounded-lg shadow-lg">
          <div className="text-sm text-muted-foreground mb-2">
            Ten (formerly Obscuro) / Community Contributions /
          </div>
          <h2 className="text-2xl font-bold mb-4">
            {/* Post about Ten in your community */}
            {taskData.name}
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <button className="bg-primary flex items-center justify-center text-primary-foreground text-sm px-3 py-1 rounded-md">
              <Icon
                icon="mdi:trophy-outline"
                className="text-white mr-2 h-4 w-4"
              ></Icon>
              Open to Submissions
            </button>
            <button className="bg-primary text-white px-3 text-sm py-1 rounded-md flex items-center gap-1 justify-center">
              <Icon
                icon="mdi:crown-outline"
                className="text-white h-5 w-4"
              ></Icon>
              10
            </button>
            <button className="text-accent-foreground text-sm flex items-center justify-center border px-3 py-1 rounded-md border-primary">
              <Icon
                icon="mdi:home"
                className="text-primary h-5 mr-1 w-4"
              ></Icon>
              Community
            </button>
          </div>
          <div className="flex flex-wrap border-t">
            <div className="flex flex-col  space-y-3 pt-4 justify-between   mb-4">
              <div className="flex space-x-12 text-muted-foreground  items-center">
                <div className="text-sm ">Status</div>
                <div className="text-sm ">
                  {taskData.status == "1"
                    ? "To Do"
                    : taskData.status == "2"
                    ? "In Progress"
                    : taskData.status == "3"
                    ? "In Review"
                    : taskData.status == "4"
                    ? "Done"
                    : "No task status"}
                </div>
              </div>
              <div className="flex space-x-8 text-muted-foreground items-center">
                <div className="text-sm  ">Assignee</div>
                <div className="text-sm ">
                  {taskData.assignee || "No task assignee."}
                </div>
              </div>
              <div className="flex space-x-14 text-muted-foreground items-center">
                <div className="text-sm  ">Skills</div>
                <button className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-md">
                  {taskData.skills.join(", ")}
                </button>
              </div>
              <div className="flex space-x-10 items-center">
                <div className="text-sm text-muted-foreground">Reviewer</div>
                <div className="flex items-center gap-2">
                  <img
                    className="w-8 h-8 rounded-full border border-primary"
                    src={"/av-7.png"}
                    alt="reviewer profile picture"
                  />
                  <span className="text-sm ">{"No task reviewer"}</span>
                </div>
              </div>
            </div>
            <div className="ml-auto flex">
              <button
                className=" mt-3 bg-primary h-8 rounded-md flex mr-auto justify-center items-center px-3 py-1 text-white"
                onClick={setSubmitFormOpen(true)}
              >
                {" "}
                <Icon
                  icon="fluent:document-pdf-32-filled"
                  className="h-4 w-4 mr-1"
                ></Icon>
                Sumbit Work
              </button>
            </div>
          </div>
          <div className="border-t border-border pt-4">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {taskData.description}
            </p>
            <ul className="list-decimal list-inside text-sm text-muted-foreground mb-4">
              <li>coverage,</li>
              <li>number of subs,</li>
              <li>platform,</li>
              <li>number of comments,</li>
              <li>post quality.</li>
            </ul>
          </div>
          <div className="border-t border-border pt-4">
            <h3 className="font-medium mb-2">Acceptance Criteria</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {taskData.acceptanceCriteria}
            </p>
            <ul className="list-decimal list-inside text-sm text-muted-foreground mb-4">
              {/* <li>coverage,</li>
            <li>number of subs,</li>
            <li>platform,</li>
            <li>number of comments,</li>
            <li>post quality.</li> */}
            </ul>
          </div>
        </div>
        <div className="w-full lg:w-1/3 bg-popover border text-popover-foreground p-2 rounded-lg shadow-md">
          <span className="font-medium mb-2 p-2 border-2 rounded-lg flex">
            {" "}
            <h3 className="mx-2 font-medium">Activity</h3>{" "}
            <Icon
              icon="mdi:filter"
              className="ml-auto flex items-center"
            ></Icon>
          </span>
          <div
            className="text-sm text-muted-foreground mb-2 p-2 cursor-pointer"
            onClick={toggleShowAll}
          >
            {showAllActivity ? (
              <span className="flex space-x-1">
                <Icon
                  icon="material-symbols:play-arrow"
                  className="w-4 h-4"
                ></Icon>
                <p>Show more</p>
              </span>
            ) : (
              <span className="flex space-x-1">
                <Icon icon="fe:arrow-down" className="w-4 h-4"></Icon>
                <p>Show less</p>
              </span>
            )}
          </div>

          {/* {showAllActivity
          ? taskData.activity.slice(0, 1).map((activity, index) => (
              <div key={index} className="text-sm m-2 text-muted-foreground">
                {activity.user} changed status from {activity.statusChange}
                <div className="text-xs text-muted-foreground">
                  {activity.date}
                </div>
              </div>
            ))
          : taskData.activity.map((activity, index) => (
              <div key={index} className="text-sm m-2 text-muted-foreground">
                {activity.user} changed status from {activity.statusChange}
                <div className="text-xs text-muted-foreground">
                  {activity.date}
                </div>
              </div>
            ))} */}
          <div className="flex mt-[35rem] p-2 ">
            <input
              type="text"
              className="flex-1 bg-input text-foreground p-2 rounded-l-lg border border-border focus:outline-none"
              placeholder="Write a comment"
            />
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-r-lg">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Taskdetails;
