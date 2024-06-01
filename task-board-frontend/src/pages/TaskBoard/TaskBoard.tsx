// src/pages/TaskBoard/TaskBoard.tsx

import {
  Stack,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
} from "@mui/material";

import { createTaskList, deleteTaskList } from "../../api/taskListApi";
import { TaskList } from "./components/TaskList";
import styles from "./TaskBoard.module.scss";
import { useState } from "react";
import { useAppDispatch } from "../../store";
import { addTaskList } from "../../features/taskList/taskListSlice";
import { TaskListType } from "../../types";

export const TaskBoard = () => {
  const [openAddTaskList, setOpenAddTaskList] = useState(false);
  const dispatch = useAppDispatch();
  // const newTask: Omit<Task, "id"> = {
  //   name: "Test 23",
  //   description: "Test 23",
  //   dueDate: "2025-05-31",
  //   priority: "Main",
  // };

  // const handleAdd = () => {
  //   deleteTask(12);
  // };

  const handleDelete = () => {
    deleteTaskList(39);
  };
  const handleCloseAddList = () => {
    setOpenAddTaskList(false);
  };

  const handleOpenAddList = () => {
    setOpenAddTaskList(true);
  };

  const handleAddNewList = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    dispatch(addTaskList(formJson as Omit<TaskListType, "id">));
    handleCloseAddList();
  };

  return (
    <div className={styles.wraper}>
      <header className={styles.header}>
        <h2>My Task Board</h2>
        <Stack spacing={2} direction="row">
          <Button variant="outlined" onClick={handleDelete}>
            History
          </Button>
          <Button variant="contained" onClick={handleOpenAddList}>
            + Create new list
          </Button>
        </Stack>
      </header>
      <main>
        <TaskList />
      </main>

      <Dialog
        open={openAddTaskList}
        onClose={handleCloseAddList}
        PaperProps={{
          component: "form",
          onSubmit: handleAddNewList,
        }}
      >
        <DialogTitle>Please add new List</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="List name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddList}>Cancel</Button>
          <Button type="submit">Add new list</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
