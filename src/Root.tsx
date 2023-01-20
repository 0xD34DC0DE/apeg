import React from "react";
import {Outlet} from "react-router-dom";
import Theme from "./data/Theme";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import "./style.css";

const theme = createTheme(Theme);

const Root = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme/>
            <Outlet/>
        </ThemeProvider>
    );
}

export default Root;