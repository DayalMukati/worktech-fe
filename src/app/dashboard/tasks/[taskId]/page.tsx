'use client';
import React, { use, useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { useParams, useRouter } from 'next/navigation';
import SubmitTaskForm from '@/components/ui/modals/SubmittaskForm';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle
} from '@radix-ui/react-dialog';
import { CrossIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AcceptTaskForm from '@/components/ui/modals/AcceptTaskfrom';
import { selectTasks, updateTasks } from '@/store/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from '@/components/ui/use-toast';

import Activites from "@/components/activities/activites";
import { setActivity } from "@/store/activities";

const Taskdetails: React.FC = () => {
  const params = useParams<{ taskId: string }>();
  const dispatch = useDispatch();

  const [taskData, setTaskData] = useState<any>();
  const [submitFormOpen, setSubmitFormOpen] = useState<boolean>(false);
  const [accpetFormOpen, setAcceptFormOpen] = useState<boolean>(false);
  const [isRejected, setIsRejected] = useState(false);

  const { tasks } = useSelector(selectTasks);
  useEffect(() => {
    setTaskData(tasks.find((task) => task._id === params.taskId) as any);
  }, []);

  const [isSubmited, setIsSubmitted] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  if (!taskData) {
    return null;
  }

  const handleSubmit = (res: any) => {
    setIsSubmitted(true);
    setSubmitFormOpen(false);
    dispatch(updateTasks(res.updateTask));
    toast({
      variant: "default",
      title: "Success!",
      description: "Task updated successfully",
    });
  };
  const handleAccept = (res: any) => {

    dispatch(updateTasks(res.updateTask));
    setIsAccepted(true);
    setAcceptFormOpen(false);
    toast({
      variant: "default",
      title: "Accepted!",
      description: "Task Accepted successfully",
    });
  };

  const handleRejectTask = () => {
    setIsRejected(true);
    toast({
      variant: "destructive",
      title: "Rejected!",
      description: "Task Rejected successfully",
    });
  };

  return (
    <>
      {accpetFormOpen && (
        <Dialog open={true}>
          <div className="z-10 fixed inset-0 bg-black opacity-30"></div>
          <DialogContent className="top-1/2 left-1/2 z-20 fixed bg-background shadow-lg p-4 rounded-lg w-[80vw] lg:w-full max-w-3xl transform -translate-x-1/2 -translate-y-1/2">
            <DialogTitle className="text-center">Accept task</DialogTitle>
            <DialogClose asChild>
              <Button
                variant={"ghost"}
                className="top-2 right-4 absolute text-muted-foreground text-xs"
                onClick={() => setAcceptFormOpen(false)}
              >
                <CrossIcon className="w-4 h-4 hover:text-red-500 rotate-45" />
              </Button>
            </DialogClose>

            <AcceptTaskForm
              taskId={params.taskId}
              handlePostSubmit={(res: any) => {
                handleAccept(res);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
      {submitFormOpen && (
        <Dialog open={true}>
          <div className="z-10 fixed inset-0 bg-black opacity-30"></div>
          <DialogContent className="top-1/2 left-1/2 z-20 fixed bg-background shadow-lg p-4 rounded-lg w-[80vw] lg:w-full max-w-3xl transform -translate-x-1/2 -translate-y-1/2">
            <DialogTitle className="text-center">Submit work</DialogTitle>
            <DialogClose asChild>
              <Button
                variant={"ghost"}
                className="top-2 right-4 absolute text-muted-foreground text-xs"
                onClick={() => setSubmitFormOpen(false)}
              >
                <CrossIcon className="w-4 h-4 hover:text-red-500 rotate-45" />
              </Button>
            </DialogClose>

            <SubmitTaskForm
              taskOnchainID={taskData?.taskId as string}
              taskId={params.taskId}
              handlePostSubmit={(res: any) => {
                handleSubmit(res);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
      <div className="flex lg:flex-row flex-col gap-2 bg-card p-2 pb-4 border text-card-foreground">
        <div className="flex-1 shadow-lg p-4 border rounded-lg">
          {/* <div className='mb-2 text-muted-foreground text-sm'>
						org/{taskData.space.name} / Community Contributions /
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
            <button className="flex justify-center items-center gap-1 bg-green-600 px-3 py-1 rounded-md text-sm text-white">
              <Icon
                icon="mdi:crown-outline"
                className="w-4 h-5 text-white"
              ></Icon>
              Amount {taskData.amount} HBAR
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
                  {taskData.assignee || "Vk@gmail.com"}
                </div>
              </div>
              <div className="flex items-center space-x-14 text-muted-foreground">
                <div className="text-sm">Skills</div>
                <div className="flex gap-2">
                  {taskData.skills.map((skill: any) => (
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
              {taskData.status === 1 ? (
                <div className="flex flex-col gap-2 w-full">
                  <button
                    className={` mt-3 bg-primary h-8 rounded-md flex mr-auto justify-center items-center px-3 py-1 text-white ${
                      isAccepted || taskData.status !== 1 ? "opacity-70 " : ""
                    }`}
                    onClick={() => setAcceptFormOpen(true)}
                    disabled={isSubmited || taskData.status !== 1 || isRejected}
                  >
                    <Icon
                      icon="fluent:document-pdf-32-filled"
                      className="mr-1 w-4 h-4"
                    ></Icon>
                    {isAccepted || taskData.status !== 1
                      ? "Accepted"
                      : "Accept Task"}
                  </button>
                  <button
                    className={` mt-3 bg-red-500 h-8 rounded-md flex mr-auto justify-center items-center px-3 py-1 text-white w-full ${
                      isAccepted || taskData.status !== 1 ? "opacity-70 " : ""
                    }`}
                    onClick={() => handleRejectTask()}
                    disabled={isRejected}
                  >
                    <Icon
                      icon="fluent:document-pdf-32-filled"
                      className="mr-1 w-4 h-4"
                    ></Icon>
                    {taskData.status !== 1 || isRejected
                      ? "Rejected"
                      : "Reject Task"}
                  </button>
                </div>
              ) : (
                <button
                  className={` mt-3 bg-primary h-8 rounded-md flex mr-auto justify-center items-center px-3 py-1 text-white ${
                    isSubmited || taskData.status !== 2 ? "opacity-70 " : ""
                  }`}
                  onClick={() => setSubmitFormOpen(true)}
                  disabled={isSubmited || taskData.status !== 2}
                >
                  <Icon
                    icon="fluent:document-pdf-32-filled"
                    className="mr-1 w-4 h-4"
                  ></Icon>
                  {isSubmited || taskData.status !== 2
                    ? "Submitted"
                    : "Sumbit Work"}
                </button>
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
        {/* <div className="flex flex-col justify-between bg-popover shadow-md p-2 border rounded-lg w-full lg:w-1/3 text-popover-foreground">
          <Activites />
        </div> */}
        <Activites activityData ={taskData.activities} taskId={params.taskId} />
      </div>
    </>
  );
};

export default Taskdetails;
