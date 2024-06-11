import { Button, IconButton, Popover } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddIcon from "@mui/icons-material/Add";
import styles from "./PopoverMenu.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { selectIsTasks } from "../../../../selectors";

interface PopoverMenuProps {
  id: number;
  onEdit: () => void;
  onDelete: () => void;
  onAdd?: () => void;
}

export const PopoverMenu = ({
  id,
  onEdit,
  onDelete,
  onAdd,
}: PopoverMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const isTasks = useSelector((state: RootState) => selectIsTasks(id)(state));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? `simple-popover-${id}` : undefined;

  return (
    <>
      <IconButton
        aria-label="settings"
        aria-describedby={popoverId}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className={styles.popoverWraper}>
          <Button
            onClick={onEdit}
            size="small"
            sx={{
              color: "#003d3d",
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <EditNoteIcon />
            Edit
          </Button>
          {onAdd && (
            <Button
              onClick={onAdd}
              size="small"
              sx={{
                color: "#003d3d",
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <AddIcon />
              Add new card
            </Button>
          )}
          <Button
            disabled={onAdd && isTasks}
            onClick={onDelete}
            size="small"
            sx={{
              color: "#ff3d3d",
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <DeleteOutlineIcon />
            Delete
          </Button>
        </div>
      </Popover>
    </>
  );
};
