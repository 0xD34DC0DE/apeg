import React, {useState} from 'react';
import {ListItemIcon, ListItemText, MenuItem} from "@mui/material";

type DialogType<T> = T extends React.FC<infer Props> ? Props extends { open: boolean, onClose: () => void } ? T : never : never;

export interface MenuBarDialogItemProps<T> {
    label: string;
    icon?: React.ReactNode;
    dialog: DialogType<T>;
    onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
}

const MenuBarDialogItem = <T, >({label, icon, dialog, onMouseEnter}: MenuBarDialogItemProps<T>) => {
    const [open, setOpen] = useState(false);

    return (
        <MenuItem onClick={() => setOpen(true)} onMouseEnter={onMouseEnter}>
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText>{label + "..."}</ListItemText>
            {React.createElement(dialog, {open, onClose: () => setOpen(false)})}
        </MenuItem>
    );
}

export default MenuBarDialogItem;