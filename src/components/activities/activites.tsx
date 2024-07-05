import React, { useState } from "react";
import Icon from "@/components/ui/icon";
import useSession from "@/hooks/use-session";
import Image from "next/image";
import { CornerDownLeft, CornerDownRight, MessageCircle } from "lucide-react";
import { useMutation } from "@apollo/client";
import { UPDATE_TASK_MUTATION } from "@/graphql/mutation";

const Activites = ({ activityData, taskId }: any) => {
  const [activity, setActivity] = useState<any>(activityData);
  const [showAllActivity, setShowAllActivity] = useState<boolean>(true);
  //   const [typing, setTyping] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const { session } = useSession();
  const [submitTaskMutation] = useMutation(UPDATE_TASK_MUTATION);

  const userData = {
    userId: session?._id,
    username: session?.username,
    profilePicture: "/avatars/avatar1.jpeg",
  };

  const toggleShowAll = () => {
    setShowAllActivity((prev) => !prev);
  };

  const handleSendComment = async (e: any) => {
    e.preventDefault();
    try {
      await submitTaskMutation({
        variables: {
          _id: taskId,
          input: {
            activities: {
              userId: userData.userId,
              activity: comment,
            },
          },
        },
        onError(error: any): never {
          throw new Error(error);
        },
        onCompleted: async (res: any) => {
          setComment("");
          setActivity(res.updateTask.activities);
        },
      });
    } catch (error) {
      console.log("error->", error);
    } finally {
    }
  };
  //   if (typing) {
  //     setTimeout(() => {
  //       setTyping(false);
  //     }, 1000);
  //   }
  return (
    <div className="flex flex-col h-[90vh]  justify-between bg-popover shadow-md p-2 border rounded-lg w-full lg:w-1/3 text-popover-foreground">
      <span className="flex border-2 mb-2 p-2 rounded-lg font-medium">
        {" "}
        <h3 className="mx-2 font-medium">Activity</h3>{" "}
        <Icon icon="mdi:filter" className="flex items-center ml-auto"></Icon>
      </span>
      <div
        className="mb-2 p-2 h-fit text-muted-foreground text-sm cursor-pointer"
        onClick={toggleShowAll}
      >
        {!showAllActivity ? (
          <span className="flex space-x-1">
            <Icon icon="material-symbols:play-arrow" className="w-4 h-4"></Icon>
            <p>Show more</p>
          </span>
        ) : (
          <span className="flex space-x-1">
            <Icon icon="fe:arrow-down" className="w-4 h-4"></Icon>
            <p>Show less</p>
          </span>
        )}
      </div>

      <div className="overflow-y-scroll h-[850px] flex flex-col justify-end scrollbar-hide">
        {showAllActivity &&
          activity.map((data: any, index: number) => (
            <div
              key={index}
              className={` m-2 text-slate-800 rounded-md  text-sm p-2  w-fit   ${
                userData.userId === data.userId
                  ? "bg-green-200 mr-auto"
                  : "bg-slate-200  ml-auto"
              }`}
            >
              {userData.userId === data.userId ? (
                <div className="">
                  <div className="flex items-center justify-start">
                    <Image
                      src={userData.profilePicture}
                      alt="profile"
                      width={30}
                      height={30}
                      className="rounded-full "
                    />
                    <div className="flex  text-xs p-2 text-sky-600">you</div>
                  </div>

                  <div className="flex text-muted-foreground text-xs text-ellipsis text-wrap ">
                    <CornerDownRight className="w-4 h-4 mr-2 text-sky-600" />
                    {data.activity}
                  </div>
                </div>
              ) : (
                <div className="">
                  <div className="flex  items-center justify-end">
                    <div className="flex  text-xs p-2 text-sky-600">
                      {userData.username}
                    </div>
                    <Image
                      src={userData.profilePicture}
                      alt="profile"
                      width={30}
                      height={30}
                      className="rounded-full "
                    />
                  </div>

                  <div className="flex text-muted-foreground text-xs text-ellipsis text-wrap justify-end">
                    {data.activity}
                    <CornerDownLeft className="w-4 h-4 mr-2 text-sky-600" />
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>

      <div className="flex  p-2">
        <input
          type="text"
          className="flex-1 bg-input p-2 border border-border rounded-l-lg text-foreground focus:outline-none"
          placeholder="Write a comment"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button
          className="bg-primary px-4 py-2 rounded-r-lg text-primary-foreground"
          onClick={handleSendComment}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Activites;
