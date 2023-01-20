import React, {useContext, useEffect} from 'react';
import {Button, Typography} from "@mui/material";
import MenuBarDropDown, {MenuBarItemProps} from "./MenuBarDropDown";
import {useAnchorPopup} from "../hooks/AnchorPopupHook";
import {NestedDropdownContext} from "./NestedDropdownContextProvider";

export interface MenuBarGroupProps<T> {
    label: string;
    children?: React.ReactElement<MenuBarItemProps<T>>[] | React.ReactElement<MenuBarItemProps<T>>;
}

//TODO rename to MenuBarMenu ?
const MenuBarGroup = <T, >({label, children}: MenuBarGroupProps<T>) => {
    const [anchorProps, handleOpen] = useAnchorPopup();
    const nestingContext = useContext(NestedDropdownContext);

    useEffect(() => {
        nestingContext.registerNestedElement({
            nestingLevel: 0,
            close: anchorProps.handleClose
        });
    }, [])

    return (
        <Button size="small"
                sx={{textTransform: "none", minHeight: 0, minWidth: 0, paddingTop: .5, paddingBottom: .5, paddingLeft: 1, paddingRight: 1}}
                onClick={handleOpen}
                onMouseLeave={() => nestingContext.onHoveredItemChanged(0)}>
            <Typography fontSize={"small"} justifyContent="center" sx={{px: 0}}>{label}</Typography>
            {children && <MenuBarDropDown nestingLevel={1} {...anchorProps}>{children}</MenuBarDropDown>}
        </Button>
    );
}

export default MenuBarGroup;