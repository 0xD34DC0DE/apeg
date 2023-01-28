import React from 'react';
import {Stack, Typography, useTheme} from "@mui/material";
import {NavLink} from "react-router-dom";

export interface EditorProps {
    name: string;
    icon: React.ReactNode;
    element: React.ReactElement;
}

const Editor = ({name, icon, element}: EditorProps) => {
    const theme = useTheme();
    return (
        <NavLink to={name} style={{textDecoration: "none", color: theme.palette.text.primary}}>
            <Stack direction="column" alignItems="center">
                {icon}
                <Typography align="center">{name}</Typography>
            </Stack>
        </NavLink>
    );
}

export default Editor;