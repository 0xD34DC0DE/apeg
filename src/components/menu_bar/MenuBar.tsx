import React from 'react';
import {MenuBarGroupProps} from "./MenuBarGroup";
import {Stack} from "@mui/material";

interface MenuBarProps<T> {
    children?: React.ReactElement<MenuBarGroupProps<T>>[] | React.ReactElement<MenuBarGroupProps<T>>;
}

const MenuBar = <T, >({children}: MenuBarProps<T>) => {
    return (
        <Stack direction="row" justifyContent="left" sx={{paddingLeft: 1}}>
            {children}
        </Stack>
    );
}

export default MenuBar;