"use client";
import TaskBoard from "@/components/task-board";
import { GET_ALL_TASKS_BY_ASSINEE_ID_QUERY } from "@/graphql/queries";
import useSession from "@/hooks/use-session";
import { useQuery } from "@apollo/client";

import React from "react";

const ProjectPage = () => {
  const { session, login, isLoading: isSessionLoading } = useSession();
  console.log("session->", session);

  return (
    <div className="pt-2">
      <TaskBoard isContributer={true} assigneeId={session?._id as string} />
    </div>
  );
};

export default ProjectPage;
