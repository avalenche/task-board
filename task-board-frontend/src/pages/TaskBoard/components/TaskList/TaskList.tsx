// src/pages/TaskBoard/components/TaskList/TaskList.tsx
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";

import { RootState, useAppDispatch } from "../../../../store";
import { getTasks, addTask } from "../../../../features/task/taskSlice";
import {
  deleteTaskList,
  getTaskList,
} from "../../../../features/taskList/taskListSlice";
import { TaskCard } from "../TaskCard";
import { TaskListType } from "../../../../types";
import { PopoverMenu } from "../PopoverMenu";
import { TaskCardDialog } from "../TaskCardDialog";

interface TaskListProps {
  onEditTaskList: (taskList: TaskListType) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ onEditTaskList }) => {
  const dispatch = useAppDispatch();
  const tasksList = useSelector(
    (state: RootState) => state.taskLists.taskLists
  );
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [currentTaskListId, setCurrentTaskListId] = useState<number | null>(
    null
  );

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getTaskList());
  }, [dispatch]);

  const handleOpenTaskDialog = (taskListId: number) => {
    setCurrentTaskListId(taskListId);
    setOpenTaskDialog(true);
  };

  const handleCloseTaskDialog = () => {
    setOpenTaskDialog(false);
    setCurrentTaskListId(null);
  };

  const handleTaskSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    if (currentTaskListId !== null) {
      dispatch(addTask({ ...formJson, idTaskList: currentTaskListId }));
      handleCloseTaskDialog();
    }
  };

  return (
    <>
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
                  onEdit={() => onEditTaskList(list)}
                  onDelete={() => dispatch(deleteTaskList(list.id))}
                  onAdd={() => handleOpenTaskDialog(list.id)}
                />
              </div>
            </div>
            <Button
              variant="outlined"
              onClick={() => {
                handleOpenTaskDialog(list.id);
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
      <TaskCardDialog
        onSubmit={handleTaskSubmit}
        onClose={handleCloseTaskDialog}
        isOpen={openTaskDialog}
      />
    </>
  );
};
