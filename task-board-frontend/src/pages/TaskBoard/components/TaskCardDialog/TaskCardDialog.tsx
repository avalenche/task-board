import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Task } from "../../../../types";

const priorytyOption = ["Low", "Medium", "Hight"];

interface TaskCardDialogProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  initialData?: Task | null;
  onClose: () => void;
  isOpen: boolean;
}

export const TaskCardDialog: React.FC<TaskCardDialogProps> = ({
  onSubmit,
  onClose,
  isOpen,
  initialData,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        component: "form",
        onSubmit: onSubmit,
      }}
    >
      <DialogTitle>{initialData ? "Edit Task" : "Add New Task"}</DialogTitle>
      <DialogContent>
        <TextField
          size="small"
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          defaultValue={initialData ? initialData.name : ""}
          label="Task Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          multiline
          size="small"
          margin="dense"
          id="description"
          name="description"
          defaultValue={initialData ? initialData.description : ""}
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
          defaultValue={initialData ? initialData.dueDate : ""}
          type="date"
          fullWidth
          variant="standard"
        />
        <TextField
          id="priority"
          select
          fullWidth
          name="priority"
          defaultValue={initialData ? initialData.priority : "Low"}
          size="small"
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
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">
          {initialData ? "Save Changes" : "Add Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
