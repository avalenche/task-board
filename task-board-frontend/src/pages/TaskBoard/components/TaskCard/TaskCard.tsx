// src/pages/TaskBoard/components/TaskCard/TaskCard.tsx

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";

import EventIcon from "@mui/icons-material/Event";
import { format } from "date-fns";

import { useAppDispatch } from "../../../../store";
import { Task } from "../../../../types";
import { deleteTask } from "../../../../features/task/taskSlice";
import { PopoverMenu } from "../PopoverMenu";

interface TaskCardData {
  data: Task[];
}

export const TaskCard = ({ data }: TaskCardData) => {
  const dispatch = useAppDispatch();

  return (
    <>
      {data.map((task) => (
        <Card variant="outlined" key={task.id}>
          <CardHeader
            action={
              <PopoverMenu
                id={task.id}
                onEdit={() => {
                  console.log(`Edit task ${task.id}`);
                  // Add your edit logic here
                }}
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
          </CardContent>
          <CardActions>
            <Button
              // variant="contained"
              onClick={() => dispatch(deleteTask(task.id))}
              size="small"
            >
              Learn More
            </Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
};
