import React from "react";
import TaskBoard from "@/components/task-board";

const ProjectPage = () => {
  return (
    <div className="pt-2">
      <TaskBoard isContributer={false} />
    </div>
  );
};

export default ProjectPage;
