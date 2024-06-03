// // src/pages/TaskBoard/components/LaskList/TaskList.tsx

import { Button, IconButton, Stack } from "@mui/material";

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../../store";
import { getTasks, addTask } from "../../../../features/task/taskSlice";
import { useEffect } from "react";

import { getTaskList } from "../../../../features/taskList/taskListSlice";
import { TaskCard } from "../TaskCard";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Task } from "../../../../types";

export const TaskList = () => {
  const dispatch = useAppDispatch();
  const tasksList = useSelector(
    (state: RootState) => state.taskLists.taskLists
  );
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getTaskList());
    console.log("useefect TaskList, dispatch");
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
              {tasks.filter((elem) => elem.idTaskList === list.id).length}
              <IconButton>
                <MoreVertIcon />
              </IconButton>
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
          <TaskCard data={tasks} />
        </Stack>
      ))}
    </Stack>
  );
};
