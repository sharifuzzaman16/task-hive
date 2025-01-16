import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import TaskCard from "../../../../components/TaskCard";

const TaskList = () => {

  const axiosPublic = useAxiosPublic();
  
  const {data: tasks = []} = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await axiosPublic.get('/tasks')
      return res.data;
    }
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <div className="grid grid-cols-3 gap-6">
        {
          tasks.map(task => <TaskCard key={task._id} task={task}></TaskCard>)
        }
      </div>
    </div>
  );
};

export default TaskList;
