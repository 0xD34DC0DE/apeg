import React from 'react';
import {Box, Stack, useTheme} from "@mui/material";
import {Outlet, Route, Routes} from "react-router-dom";
import {EditorProps} from "./Editor";

interface EditorContainerProps {
    children?: React.ReactElement | React.ReactElement[];
}

const EditorContainer = ({children}: EditorContainerProps) => {
    const theme = useTheme();
    return (
        <>
            <Stack direction="row" spacing={1} justifyContent="center" sx={{background: theme.palette.primary.dark}}>
                {children}
            </Stack>
            <Routes>
                {
                    React.Children.map(children, (child) => {
                        if (React.isValidElement(child)) {
                            const {name, element} = child.props as EditorProps;
                            return <Route path={name} element={element}/>
                        }
                    })
                }
            </Routes>
            <Box  display="flex" flex='1' flexDirection="column">
                <Outlet/>
            </Box>
        </>
    );
}

export default EditorContainer;