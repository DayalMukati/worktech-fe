'use client';
import React, { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import CompleteTaskForm from "@/components/ui/modals/ComplettaskForm";
import { CrossIcon } from "lucide-react";
import { selectTasks, updatePrivateTasks } from "@/store/taskSlice";
import { useDispatch, useSelector } from "react-redux";

const Taskdetails: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams<{ taskId: string }>();

  const [taskData, setTaskData] = useState({
    name: "No task name",
    description: "No task description",
    skills: [] as { _id: string; title: string }[],
    docUrl: "No task docUrl",
    assignee: "Pawan Kumar",
    reviewer: "Rahul",
    acceptanceCriteria: "No task acceptance criteria",
    status: 1,
    taskId: 0,
  });

  const [showAllActivity, setShowAllActivity] = useState<boolean>(false);
  const [openFromReview, setopenFromReview] = useState<boolean>(false);

  const { pirvateTasks } = useSelector(selectTasks);
  console.log("pirvateTasks->", pirvateTasks);

  useEffect(() => {
    setTaskData(pirvateTasks.find((task) => task._id === params.taskId) as any);
  }, []);

  const toggleShowAll = () => {
    setShowAllActivity((prev) => !prev);
  };

  if (!taskData) {
    return null;
  }

  const handleReject = () => {
    console.log("rejected");
  };

  return (
    <>
      {openFromReview && (
        <Dialog open={true}>
          <div className="z-10 fixed inset-0 bg-black opacity-30"></div>
          <DialogContent className="top-1/2 left-1/2 z-20 fixed bg-background shadow-lg p-4 rounded-lg w-[80vw] lg:w-full max-w-3xl transform -translate-x-1/2 -translate-y-1/2">
            <DialogTitle className="text-center">Review work</DialogTitle>
            <DialogClose asChild>
              <Button
                variant={"ghost"}
                className="top-2 right-4 absolute text-muted-foreground text-xs"
                onClick={() => setopenFromReview(false)}
              >
                <CrossIcon className="w-4 h-4 hover:text-red-500 rotate-45" />
              </Button>
            </DialogClose>

            <CompleteTaskForm
              taskId={params.taskId as string}
              docUrl={taskData.docUrl}
              taskOnchainID={taskData.taskId}
              handlePostSubmit={(res: any) => {
                setopenFromReview(false);
                dispatch(updatePrivateTasks(res.updateTask));
              }}
            />
          </DialogContent>
        </Dialog>
      )}

      <div className="flex lg:flex-row flex-col gap-2 bg-card p-2 pb-4 border text-card-foreground">
        <div className="flex-1 shadow-lg p-4 border rounded-lg">
          {/* <div className='mb-2 text-muted-foreground text-sm'>
						Ten (formerly Obscuro) / Community Contributions /
					</div> */}
          <h2 className="mb-4 font-bold text-2xl">
            {/* Post about Ten in your community */}
            {taskData.name}
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <button className="flex justify-center items-center bg-primary px-3 py-1 rounded-md text-primary-foreground text-sm">
              <Icon
                icon="mdi:trophy-outline"
                className="mr-2 w-4 h-4 text-white"
              ></Icon>
              Open to Submissions
            </button>
            <button className="flex justify-center items-center gap-1 bg-primary px-3 py-1 rounded-md text-sm text-white">
              <Icon
                icon="mdi:crown-outline"
                className="w-4 h-5 text-white"
              ></Icon>
              10
            </button>
            <button className="flex justify-center items-center border-primary px-3 py-1 border rounded-md text-accent-foreground text-sm">
              <Icon
                icon="mdi:home"
                className="mr-1 w-4 h-5 text-primary"
              ></Icon>
              Community
            </button>
          </div>
          <div className="flex flex-wrap border-t">
            <div className="flex flex-col justify-between space-y-3 mb-4 pt-4">
              <div className="flex items-center space-x-12 text-muted-foreground">
                <div className="text-sm">Status</div>
                <div className="border-2 bg-secondary px-2 py-0.5 rounded text-sm">
                  {taskData.status == 1
                    ? "To Do"
                    : taskData.status == 2
                    ? "In Progress"
                    : taskData.status == 3
                    ? "In Review"
                    : taskData.status == 4
                    ? "Done"
                    : "No task status"}
                </div>
              </div>
              <div className="flex items-center space-x-8 text-muted-foreground">
                <div className="text-sm">Assignee</div>
                <div className="text-sm">
                  {taskData.assignee || "No task assignee."}
                </div>
              </div>
              <div className="flex items-center space-x-14 text-muted-foreground">
                <div className="text-sm">Skills</div>
                <div className="flex gap-2">
                  {taskData.skills.map((skill) => (
                    <span
                      key={skill._id}
                      className="flex bg-primary px-3 py-1 rounded text-muted-foreground text-sm text-white"
                    >
                      {skill.title}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-10">
                <div className="text-muted-foreground text-sm">Reviewer</div>
                <div className="flex items-center gap-2">
                  <img
                    className="border-primary border rounded-full w-8 h-8"
                    src={"/av-7.png"}
                    alt="reviewer profile picture"
                  />
                  <span className="text-sm">{"No task reviewer"}</span>
                </div>
              </div>
            </div>
            <div className="flex ml-auto">
              {taskData.status == 3 ? (
                <div className="flex flex-col w-full gap-2">
                  <Button
                    className="flex justify-center items-center bg-primary mt-3 mr-auto px-3 py-1 rounded-md h-8 text-white w-full"
                    onClick={() => setopenFromReview(true)}
                  >
                    <Icon
                      icon="fluent:document-pdf-32-filled"
                      className="mr-auto w-4 h-4"
                    ></Icon>
                    Review Work
                  </Button>
                  <Button
                    className="flex  bg-red-500 text-center mt-3 mr-auto px-3 py-1 rounded-md h-8 text-white w-full hover:bg-red-600"
                    onClick={() => handleReject()}
                  >
                    <Icon
                      icon="fluent:document-pdf-32-filled"
                      className=" mr-1 w-4 h-4"
                    ></Icon>
                    Reject
                  </Button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="pt-4 border-t border-border">
            <h3 className="mb-2 font-medium">Description</h3>
            <p className="mb-4 text-muted-foreground text-sm">
              {taskData.description}
            </p>
            <ul className="mb-4 text-muted-foreground text-sm list-decimal list-inside">
              <li>coverage,</li>
              <li>number of subs,</li>
              <li>platform,</li>
              <li>number of comments,</li>
              <li>post quality.</li>
            </ul>
          </div>
          <div className="pt-4 border-t border-border">
            <h3 className="mb-2 font-medium">Acceptance Criteria</h3>
            <p className="mb-4 text-muted-foreground text-sm">
              {taskData.acceptanceCriteria}
            </p>
            <ul className="mb-4 text-muted-foreground text-sm list-decimal list-inside">
              {/* <li>coverage,</li>
            <li>number of subs,</li>
            <li>platform,</li>
            <li>number of comments,</li>
            <li>post quality.</li> */}
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-between bg-popover shadow-md p-2 border rounded-lg w-full lg:w-1/3 text-popover-foreground">
          <span className="flex border-2 mb-2 p-2 rounded-lg font-medium">
            {" "}
            <h3 className="mx-2 font-medium">Activity</h3>{" "}
            <Icon
              icon="mdi:filter"
              className="flex items-center ml-auto"
            ></Icon>
          </span>
          <div
            className="mb-2 p-2 h-full text-muted-foreground text-sm cursor-pointer"
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
              <div key={index} className="m-2 text-muted-foreground text-sm">
                {activity.user} changed status from {activity.statusChange}
                <div className="text-muted-foreground text-xs">
                  {activity.date}
                </div>
              </div>
            ))
          : taskData.activity.map((activity, index) => (
              <div key={index} className="m-2 text-muted-foreground text-sm">
                {activity.user} changed status from {activity.statusChange}
                <div className="text-muted-foreground text-xs">
                  {activity.date}
                </div>
              </div>
            ))} */}
          <div className="flex mt-[35rem] p-2">
            <input
              type="text"
              className="flex-1 bg-input p-2 border border-border rounded-l-lg text-foreground focus:outline-none"
              placeholder="Write a comment"
            />
            <button className="bg-primary px-4 py-2 rounded-r-lg text-primary-foreground">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Taskdetails;
