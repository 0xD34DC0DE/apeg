import React, {useContext, useState} from 'react';
import {ListItemIcon, ListItemText, MenuItem} from "@mui/material";
import {NestedDropdownContext} from "./NestedDropdownContextProvider";

type DialogType<T> = T extends React.FC<infer Props> ? Props extends {open: boolean, onClose: () => void} ? T : never : never;

export interface MenuBarDialogItemProps<T> {
    label: string;
    nestingLevel?: number;
    icon?: React.ReactNode;
    dialog: DialogType<T>
}

const MenuBarDialogItem = <T,>({label, nestingLevel, icon, dialog}: MenuBarDialogItemProps<T>) => {
    const [open, setOpen] = useState(false);
    const nestingContext = useContext(NestedDropdownContext);
    return (
        <MenuItem onClick={() => setOpen(true)} onMouseLeave={() => nestingContext.onHoveredItemChanged(nestingLevel)}>
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText>{label + "..."}</ListItemText>
            {React.createElement(dialog, {open, onClose: () => setOpen(false)})}
        </MenuItem>
    );
}

export default MenuBarDialogItem;