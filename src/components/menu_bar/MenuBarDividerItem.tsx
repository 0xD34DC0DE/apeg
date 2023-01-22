import React from 'react';
import {Divider} from "@mui/material";

export interface MenuBarDividerItemProps {
}

const MenuBarDividerItem = ({}: MenuBarDividerItemProps) => {
    return (
        <Divider style={{marginTop: 3, marginBottom: 3}}/>
    );
}

export default MenuBarDividerItem;