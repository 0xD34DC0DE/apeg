import React from "react";
import {GetApps} from "../Routes";
import AppLaunchIcon from "./components/AppLaunchIcon";
import {useNavigate} from "react-router-dom";
import {Checkbox, FormControlLabel, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";

const AppMenu = () => {
    const navigate = useNavigate();

    return (
        <Grid container height="100%" width="100%" direction="column" alignItems="center">
            <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h4" display="inline">Applications</Typography>
            </Grid>
            <Grid container width="100%" justifyContent="center" alignItems="center" direction="row" spacing={5}>
                {
                    GetApps().map((app, i) =>
                        <Grid item key={i}>
                            <AppLaunchIcon {...app} onClick={() => navigate(app.route)}/>
                        </Grid>
                    )
                }
            </Grid>
            <Grid item xs display="flex" justifyContent="center" alignItems="center">
                <FormControlLabel control={<Checkbox defaultChecked/>} label="Launch selected app on startup"/>
                { /* TODO: create hooks: usePersistentState() to remember values in file (protobuff?)*/ }
            </Grid>
        </Grid>
    );
}

export default AppMenu;
