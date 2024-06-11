// src/pages/TaskBoard/TaskBoard.tsx

import { Stack, Button, CircularProgress, Snackbar } from "@mui/material";
import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../store";
import {
  addTaskList,
  updateTaskList,
} from "../../features/taskList/taskListSlice";
import { TaskListType } from "../../types";
import { deleteTask, getTasks } from "../../features/task/taskSlice";
import { TaskList } from "./components/TaskList";
import styles from "./TaskBoard.module.scss";
import { TaskListDialog } from "./components/TaskListDialog";

export const TaskBoard = () => {
  const [openTaskListDialog, setOpenTaskListDialog] = useState(false);
  const [editingTaskList, setEditingTaskList] = useState<TaskListType | null>(
    null
  );
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const dispatch = useAppDispatch();
  const { deleting, deleteError } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    if (deleting === "succeeded") {
      setSnackbarMessage("Task deleted successfully!");
      dispatch(getTasks());
    } else if (deleting === "failed") {
      setSnackbarMessage(deleteError || "Failed to delete task");
    }
  }, [deleteError, deleting, dispatch]);

  const handleDelete = () => {
    dispatch(deleteTask(57));
  };
  const handleCloseTaskListDialog = () => {
    setOpenTaskListDialog(false);
    setEditingTaskList(null);
  };

  const handleOpenAddTaskList = () => {
    setOpenTaskListDialog(true);
  };

  const handleEditTaskList = (taskList: TaskListType) => {
    setEditingTaskList(taskList);
    setOpenTaskListDialog(true);
  };

  const handleTaskListSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    if (editingTaskList) {
      dispatch(updateTaskList({ ...editingTaskList, ...formJson }));
    } else {
      dispatch(addTaskList(formJson as Omit<TaskListType, "id">));
    }
    handleCloseTaskListDialog();
  };

  return (
    <div className={styles.wraper}>
      <header className={styles.header}>
        <h2>My Task Board</h2>
        <Stack spacing={2} direction="row">
          <Button
            variant="outlined"
            onClick={handleDelete}
            disabled={deleting === "loading"}
          >
            {deleting === "loading" ? (
              <CircularProgress size={24} />
            ) : (
              "History"
            )}
          </Button>
          <Button variant="contained" onClick={handleOpenAddTaskList}>
            + Create new list
          </Button>
        </Stack>
      </header>

      <main>
        <TaskList onEditTaskList={handleEditTaskList} />
      </main>
      <TaskListDialog
        isOpen={openTaskListDialog}
        onClose={handleCloseTaskListDialog}
        onSubmit={handleTaskListSubmit}
        initialData={editingTaskList}
      />
      <Snackbar
        open={Boolean(snackbarMessage)}
        autoHideDuration={4000}
        onClose={() => setSnackbarMessage("")}
        message={snackbarMessage}
      />
    </div>
  );
};
