"use client";
import TaskBoard from "@/components/task-board";
import ErrorDisplay from "@/components/ui/ErrorDisplay";
import BoardGrid from "@/components/ui/boardGrid";
import { GET_ALL_TASKS_BY_ASSINEE_ID_QUERY } from "@/graphql/queries";
import useSession from "@/hooks/use-session";
import { setTasks } from "@/store/taskSlice";
import { useQuery } from "@apollo/client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const ProjectPage = () => {
  return (
    <div className="pt-2">
      <TaskBoard isContributer={true} />
    </div>
  );
};

export default ProjectPage;
