import React from 'react';
// @ts-ignore
import {ReactComponent as LazyLatexAppIcon} from '../../assets/latex.svg'
import {Stack, SvgIcon} from "@mui/material";

export const lazy_latex_route: string = "lazy_latex/*";
export const lazy_latex_name: string = "Lazy Latex";
export const lazy_latex_icon = <SvgIcon component={LazyLatexAppIcon} inheritViewBox color="secondary" sx={{fontSize: 128}}/>

const LazyLatexApp = () => {
    return (
        <Stack height={1}>

        </Stack>
    );
}

export default LazyLatexApp;