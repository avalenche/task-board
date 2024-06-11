import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
} from "@mui/material";
import { TaskListType } from "../../../../types";

interface TaskListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  initialData?: TaskListType | null;
}

export const TaskListDialog = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: TaskListDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        component: "form",
        onSubmit: onSubmit,
      }}
    >
      <DialogTitle>
        {initialData ? "Edit Task List" : "Add New Task List"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="List name"
          type="text"
          defaultValue={initialData?.name || ""}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">
          {initialData?.name ? "Save change" : "AddList"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
