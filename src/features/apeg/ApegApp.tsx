import React from 'react';
// @ts-ignore
import {ReactComponent as ApegAppIcon} from '../../assets/kaaba.svg'
import {SvgIcon} from "@mui/material";
import ApegMenuBar from "./ApegMenuBar";

export const apeg_route: string = "apeg";
export const apeg_name: string = "Apeg";
export const apeg_icon = <SvgIcon component={ApegAppIcon} inheritViewBox color="secondary" sx={{fontSize: 128}}/>

const ApegApp = () => {
    return (
        <ApegMenuBar/>
    );
}

export default ApegApp;