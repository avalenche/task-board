// src/pages/TaskBoard/components/TaskCard/TaskCard.tsx

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import EventIcon from "@mui/icons-material/Event";
import { format } from "date-fns";

import { useAppDispatch, useAppSelector } from "../../../../store";
import { Task, TaskListType } from "../../../../types";
import { deleteTask, updateTask } from "../../../../features/task/taskSlice";
import { PopoverMenu } from "../PopoverMenu";
import { RootState } from "../../../../store";
import { TaskCardDialog } from "../TaskCardDialog";
import styles from "./TaskCard.module.scss";

interface TaskCardData {
  data: Task[];
}

export const TaskCard = ({ data }: TaskCardData) => {
  const dispatch = useAppDispatch();
  const taskLists = useAppSelector(
    (state: RootState) => state.taskLists.taskLists
  );
  const [moveList, setMoveList] = useState("");

  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const handleChangeTaskToList = (
    taskId: number,
    event: SelectChangeEvent<number>
  ) => {
    const newTaskListId = +event.target.value;
    setMoveList("");
    dispatch(updateTask({ id: taskId, idTaskList: newTaskListId }));
  };

  const handleOpenTaskDialog = (task: Task) => {
    setCurrentTask(task);
    setOpenTaskDialog(true);
  };

  const handleCloseTaskDialog = () => {
    setOpenTaskDialog(false);
    setCurrentTask(null);
  };

  const handleTaskSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    if (currentTask) {
      dispatch(updateTask({ ...currentTask, ...formJson }));
    }
    handleCloseTaskDialog();
  };

  return (
    <>
      {data.map((task) => {
        const otherTaskLists = taskLists.filter(
          (list) => list.id !== task.idTaskList
        );
        return (
          <Card variant="outlined" key={task.id}>
            <CardHeader
              action={
                <PopoverMenu
                  id={task.id}
                  onEdit={() => handleOpenTaskDialog(task)}
                  onDelete={() => {
                    dispatch(deleteTask(task.id));
                  }}
                />
              }
              title={task.name}
            />
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                {task.description}
              </Typography>

              <Stack spacing={1} direction="row">
                <EventIcon />
                <Typography component="span" color="text.secondary">
                  {format(new Date(task.dueDate), "EEE, dd MMM")}
                </Typography>
              </Stack>
              <Chip label={task.priority} sx={{ mt: 1 }} />
            </CardContent>
            <CardActions>
              <FormControl fullWidth key={`${task.id}-form-label`}>
                <InputLabel> Move to:</InputLabel>
                <Select
                  value={moveList}
                  label="Move to:"
                  onChange={(event) => handleChangeTaskToList(task.id, event)}
                  className={styles.moveTo}
                >
                  {otherTaskLists.map((taskList: TaskListType) => (
                    <MenuItem key={taskList.id} value={taskList.id}>
                      {taskList.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardActions>
          </Card>
        );
      })}
      <TaskCardDialog
        onSubmit={handleTaskSubmit}
        onClose={handleCloseTaskDialog}
        isOpen={openTaskDialog}
        initialData={currentTask}
      />
    </>
  );
};
