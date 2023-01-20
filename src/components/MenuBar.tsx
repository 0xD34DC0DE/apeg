import React from 'react';
import {MenuBarGroupProps} from "./MenuBarGroup";
import {Stack} from "@mui/material";
import NestedDropdownContextProvider from "./NestedDropdownContextProvider";

interface MenuBarProps<T> {
    children?: React.ReactElement<MenuBarGroupProps<T>>[] | React.ReactElement<MenuBarGroupProps<T>>;
}

// TODO remove NestedDropdownContextProvider, replace with useNestedDropdownContext -> create a context just for the menu bar
// because right now the context is global and not only for the menu bar

// TODO handle background closing the menu (not supposed to happen)
const MenuBar = <T,>({children}: MenuBarProps<T>) => {
    return (
        <Stack direction="row" justifyContent="left" sx={{paddingLeft: 1}}>
            <NestedDropdownContextProvider>
                {children}
            </NestedDropdownContextProvider>
        </Stack>
    );
}

export default MenuBar;