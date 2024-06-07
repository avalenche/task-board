// src/pages/TaskBoard/components/TaskList/TaskList.tsx
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Button, IconButton, Stack } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
    name: "Test 3",
    description: "Test 23",
    dueDate: "2025-05-31",
    priority: "Main",
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
                onAdd={() => console.log("Add item")}
              />
              {/* <IconButton>
                <MoreVertIcon />
              </IconButton> */}
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
