import React from 'react';
import { tasks } from '@/conf/data';
import TaskCardItem from '@/components/task-card-item';
import { useQuery } from "@apollo/client";
import { LIST_ALL_TASKS_QUERY } from "@/graphql/queries";

const OpenTaskList = () => {
  const { loading, error, data } = useQuery(LIST_ALL_TASKS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div className="w-full container px-24">
      <div className="flex flex-col justify-center items-center my-6 w-full">
        <h1 className="text-3xl text-primary">Open Tasks</h1>
        <p className="text-muted-foreground">
          <span className="text-primary">{data?.listAllTasks.length}</span>{" "}
          tasks open
        </p>
      </div>
      <div className="gap-4 grid grid-cols-3 mb-10">
        {/* Iterate over tasks and display them */}
        {data?.listAllTasks.map((task) => (
          <TaskCardItem key={task._id} task={task as any} />
        ))}
      </div>
    </div>
  );
};

export default OpenTaskList;
