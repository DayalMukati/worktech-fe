"use client";
import React, { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

interface Task {
  status: string;
  assignee: string;
  skills: string[];
  reviewer: { name: string; profilePicture: string };
  description: string;
  acceptanceCriteria: string;
  activity: { user: string; statusChange: string; date: string }[];
}

const dummyData: Task = {
  status: "To Do",
  assignee: "",
  skills: ["COMMUNITY"],
  reviewer: { name: "scagria", profilePicture: "/av-7.png" },
  description:
    "Are you an influencer? Tell your community about Obscuro. Provide a link to your post, and we will appreciate your help in the development of our community. Points will be awarded individually depending on such indicators as:",
  acceptanceCriteria:
    "Are you an influencer? Tell your community about Obscuro. Provide a link to your post, and we will appreciate your help in the development of our community. Points will be awarded individually depending on such indicators as:",
  activity: [
    {
      user: "YENGALIA SUJANA",
      statusChange: "To Do to Done",
      date: "Jun 2 at 6:32 pm",
    },
    {
      user: "JOHN DEO",
      statusChange: "To Do to Done",
      date: "Jun 2 at 6:32 pm",
    },
    {
      user: "AISHA LALCHANDANI",
      statusChange: "To Do to Done",
      date: "Jun 2 at 6:32 pm",
    },
  ],
};

const Taskdetails: React.FC = () => {
  const [taskData, setTaskData] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllActivity, setShowAllActivity] = useState<boolean>(false);

  useEffect(() => {
    // Simulate an API call with a timeout
    setTimeout(() => {
      try {
        setTaskData(dummyData);
        setError(null);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }, 1000); // Simulating a 1 second delay
  }, []);

  const toggleShowAll = () => {
    setShowAllActivity((prev) => !prev);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!taskData) {
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-2 p-2 pb-4  border bg-card text-card-foreground ">
      <div className="flex-1 border p-4 rounded-lg shadow-lg">
        <div className="text-sm text-muted-foreground mb-2">
          Ten (formerly Obscuro) / Community Contributions /
        </div>
        <h2 className="text-2xl font-bold mb-4">
          Post about Ten in your community
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
            <Icon icon="mdi:home" className="text-primary h-5 mr-1 w-4"></Icon>
            Community
          </button>
        </div>
        <div className="flex flex-wrap border-t">
          <div className="flex flex-col  space-y-3 pt-4 justify-between   mb-4">
            <div className="flex space-x-12 text-muted-foreground  items-center">
              <div className="text-sm ">Status</div>
              <div className="text-sm ">{taskData.status}</div>
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
                  src={taskData.reviewer.profilePicture}
                  alt="reviewer profile picture"
                />
                <span className="text-sm ">{taskData.reviewer.name}</span>
              </div>
            </div>
          </div>
          <div className="ml-auto flex">
            <button className=" mt-3 bg-primary h-8 rounded-md flex mr-auto justify-center items-center px-3 py-1 text-white">
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
            <li>coverage,</li>
            <li>number of subs,</li>
            <li>platform,</li>
            <li>number of comments,</li>
            <li>post quality.</li>
          </ul>
        </div>
      </div>
      <div className="w-full lg:w-1/3 bg-popover border text-popover-foreground p-2 rounded-lg shadow-md">
        <span className="font-medium mb-2 p-2 border-2 rounded-lg flex">
          {" "}
          <h3 className="mx-2 font-medium">Activity</h3>{" "}
          <Icon icon="mdi:filter" className="ml-auto flex items-center"></Icon>
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

        {showAllActivity
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
            ))}
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
  );
};

export default Taskdetails;
