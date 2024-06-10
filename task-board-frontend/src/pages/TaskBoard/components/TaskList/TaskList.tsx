// src/pages/TaskBoard/components/TaskList/TaskList.tsx
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Button, Stack } from "@mui/material";

import { RootState, useAppDispatch } from "../../../../store";
import { getTasks, addTask } from "../../../../features/task/taskSlice";
import {
  deleteTaskList,
  getTaskList,
} from "../../../../features/taskList/taskListSlice";
import { TaskCard } from "../TaskCard";
import { Task } from "../../../../types";
import { PopoverMenu } from "../PopoverMenu";

export const TaskList = () => {
  const dispatch = useAppDispatch();
  const tasksList = useSelector(
    (state: RootState) => state.taskLists.taskLists
  );
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getTaskList());
  }, [dispatch]);

  const newTask: Omit<Task, "id" & "idTaskList"> = {
    name: "Add new menu",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
    dueDate: "2024-08-21",
    priority: "Medium",
  };

  return (
    <Stack spacing={2} direction="row">
      {tasksList.map((list) => (
        <Stack spacing={2} key={list.id}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>{list.name}</p>
            <div>
              {tasks.filter((task) => task.idTaskList === list.id).length}
              <PopoverMenu
                id={list.id}
                onEdit={() => console.log(list.id)}
                onDelete={() => dispatch(deleteTaskList(list.id))}
                onAdd={() =>
                  dispatch(addTask({ ...newTask, idTaskList: list.id }))
                }
              />
            </div>
          </div>
          <Button
            variant="outlined"
            onClick={() => {
              dispatch(addTask({ ...newTask, idTaskList: list.id }));
            }}
          >
            Add new Card
          </Button>

          <TaskCard
            data={tasks.filter((task) => task.idTaskList === list.id)}
          />
        </Stack>
      ))}
    </Stack>
  );
};
