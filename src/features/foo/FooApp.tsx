import React from 'react';
// @ts-ignore
import {ReactComponent as Logo} from '../../assets/flame.svg'
import {SvgIcon} from "@mui/material";

export const foo_route: string = "foo";
export const foo_name: string = "Foo";
export const foo_icon = <SvgIcon component={Logo} inheritViewBox sx={{ fontSize: 128 }} />
interface FooAppProps {

}

const FooApp = ({}: FooAppProps) => {
    return (
        <div>Foo</div>
    );
}

export default FooApp;