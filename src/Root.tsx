import React from "react";
import {Outlet} from "react-router-dom";
import Theme from "./data/Theme";
import {Box, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import "./style.css";

const theme = createTheme(Theme);

const Root = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box height={1} width={1}>
                <CssBaseline enableColorScheme/>
                <Outlet/>
            </Box>
        </ThemeProvider>
    );
}

export default Root;