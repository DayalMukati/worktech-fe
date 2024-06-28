"use client";
import TaskBoard from "@/components/task-board";
import { GET_ALL_TASKS_BY_ASSINEE_ID_QUERY } from "@/graphql/queries";
import { useQuery } from "@apollo/client";

import React from "react";

const ProjectPage = () => {
  return (
    <div className="pt-2">
      <TaskBoard isContributer={true} assigneeId="61b1d7e4e9f4d1b6c9a9d4a4" />
    </div>
  );
};

export default ProjectPage;
