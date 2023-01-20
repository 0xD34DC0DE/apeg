import React, {useContext, useState} from 'react';
import {ListItemIcon, ListItemText, MenuItem, useTheme} from "@mui/material";
import Shortcut, {ShortcutType} from "./Shortcut";
import {NestedDropdownContext} from "./NestedDropdownContextProvider";

export interface MenuBarActionItemProps {
    label: string;
    nestingLevel?: number;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    prefixIcon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    shortcut?: ShortcutType;
    onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
    children?: React.ReactNode | React.ReactNode[] | null;
}

const MenuBarActionItem = ({
                               label,
                               nestingLevel,
                               onClick,
                               prefixIcon,
                               suffixIcon,
                               shortcut,
                               onMouseEnter,
                               onMouseLeave,
                               children
                           }: MenuBarActionItemProps) => {
    const theme = useTheme();
    const nestingContext = useContext(NestedDropdownContext);

    function handleMouseLeave(event: React.MouseEvent<HTMLElement>) {
        nestingContext.onHoveredItemChanged(nestingLevel);
        onMouseLeave && onMouseLeave(event);
    }

    return (
        <MenuItem onClick={onClick}
                  onMouseDown={e => e.stopPropagation()} // prevent parent item from doing click animation
                  sx={{py: 0.3, px: 1}}
                  style={{paddingLeft: 6}}
                  onMouseLeave={handleMouseLeave}
                  onMouseEnter={onMouseEnter}>
            {prefixIcon &&
                <ListItemIcon
                    style={{minWidth: 18, marginRight: 4, fill: theme.palette.primary.main}}>
                    {prefixIcon}
                </ListItemIcon>
            }
            {!prefixIcon && <ListItemIcon style={{minWidth: 18, marginRight: 4}}/>}
            <ListItemText primaryTypographyProps={{fontSize: "small", marginRight: 4}}>{label}</ListItemText>
            {shortcut && <Shortcut shortcut={shortcut}/>}
            {suffixIcon && <ListItemIcon style={{minWidth: 16, paddingLeft: 0}}>{suffixIcon}</ListItemIcon>}
            {children}
        </MenuItem>
    );
}

export default MenuBarActionItem;