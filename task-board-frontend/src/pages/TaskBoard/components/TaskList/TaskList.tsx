// src/pages/TaskBoard/components/TaskList/TaskList.tsx
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

import { RootState, useAppDispatch } from "../../../../store";
import { getTasks, addTask } from "../../../../features/task/taskSlice";
import {
  deleteTaskList,
  getTaskList,
} from "../../../../features/taskList/taskListSlice";
import { TaskCard } from "../TaskCard";
import { Task } from "../../../../types";
import { PopoverMenu } from "../PopoverMenu";

const priorytyOption = ["Low", "Medium", "Hight"];

export const TaskList = () => {
  const dispatch = useAppDispatch();
  const tasksList = useSelector(
    (state: RootState) => state.taskLists.taskLists
  );
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [openAddTask, setOpenAddTask] = useState(false);
  const [currentTaskListId, setCurrentTaskListId] = useState<number | null>(
    null
  );

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getTaskList());
  }, [dispatch]);

  const handleCloseAddTask = () => {
    setOpenAddTask(false);
    setCurrentTaskListId(null);
  };

  const handleOpenAddList = (taskListId: number) => {
    setCurrentTaskListId(taskListId);
    setOpenAddTask(true);
  };

  const handleAddNewTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    dispatch(addTask({ ...formJson, idTaskList: currentTaskListId }));
    handleCloseAddTask();
  };

  const newTask: Omit<Task, "id" & "idTaskList"> = {
    name: "Add new menu",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
    dueDate: "2024-08-21",
    priority: "Medium",
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
                handleOpenAddList(list.id);
                // dispatch(addTask({ ...newTask, idTaskList: list.id }));
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
      <Dialog
        open={openAddTask}
        onClose={handleCloseAddTask}
        PaperProps={{
          component: "form",
          onSubmit: handleAddNewTask,
        }}
      >
        <DialogTitle>Please add new Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Task Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="dueDate"
            name="dueDate"
            label="Date to do"
            type="date"
            fullWidth
            variant="standard"
          />
          <TextField
            id="priority"
            select
            fullWidth
            name="priority"
            defaultValue="Low"
            SelectProps={{
              native: true,
            }}
            helperText="Please select priority"
          >
            {priorytyOption.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddTask}>Cancel</Button>
          <Button type="submit">Add new list</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
