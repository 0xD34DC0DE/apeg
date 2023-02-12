import React from "react";
import {RouteObject} from "react-router-dom";

import AppMenu from "./app_menu/AppMenu";
import ApegApp, {apeg_route, apeg_icon, apeg_name} from "./apeg/ApegApp";
import FooApp, {foo_route, foo_icon, foo_name} from "./foo/FooApp";

import Root from "../Root";
import LazyLatexApp, {lazy_latex_icon, lazy_latex_name, lazy_latex_route} from "./lazy_latex/LazyLatexApp";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                index: true,
                element: <AppMenu/>
            },
            {
                path: apeg_route,
                element: <ApegApp/>,
                handle: {
                    name: apeg_name,
                    icon: apeg_icon
                } as AppInfo
            },
            {
                path: foo_route,
                element: <FooApp/>,
                handle: {
                    name: foo_name,
                    icon: foo_icon
                } as AppInfo
            },
            {
                path: lazy_latex_route,
                element: <LazyLatexApp/>,
                handle: {
                    name: lazy_latex_name,
                    icon: lazy_latex_icon
                } as AppInfo
            }
        ]
    }
];

export type AppInfo = {
    route: string;
    name: string;
    icon?: React.ReactNode;
}

export const GetApps = (): AppInfo[] => routes[0].children?.filter(r => r.handle).map(r => ({...r.handle, route: r.path})) ?? [];

export default routes;