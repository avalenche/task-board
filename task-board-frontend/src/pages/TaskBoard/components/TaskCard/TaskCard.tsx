import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EventIcon from "@mui/icons-material/Event";
import { Task } from "../../../../types";
import { format } from "date-fns";
interface TaskCardData {
  data: Task[];
}

export const TaskCard = (data: TaskCardData) => {
  return (
    <>
      {data.data.map((task) => (
        <Card variant="outlined" key={task.id}>
          <CardHeader
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={task.name}
          />
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              {task.description}
            </Typography>

            <Typography color="text.secondary">
              <Stack spacing={1} direction="row">
                <EventIcon />
                <span>{format(task.dueDate, "EEE, dd MMM")}</span>
              </Stack>
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => console.log("Task Id: ", task.id)}
            >
              Learn More
            </Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
};
