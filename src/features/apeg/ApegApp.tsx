import React from 'react';
// @ts-ignore
import {ReactComponent as ApegAppIcon} from '../../assets/kaaba.svg'
// @ts-ignore
import  {ReactComponent as FolderOpenIcon} from '../../assets/folder-open.svg'
import {SvgIcon} from "@mui/material";
import MenuBar from "../../components/MenuBar";
import MenuBarGroup from "../../components/MenuBarGroup";
import MenuBarActionItem from "../../components/MenuBarActionItem";
import MenuBarDividerItem from "../../components/MenuBarDividerItem";
import MenuBarSubMenuItem from "../../components/MenuBarSubMenuItem";

export const apeg_route: string = "apeg";
export const apeg_name: string = "Apeg";
export const apeg_icon = <SvgIcon component={ApegAppIcon} inheritViewBox color="secondary" sx={{ fontSize: 128 }} />
const ApegApp = () => {
    return (
        <MenuBar>
            <MenuBarGroup label="File">
                <MenuBarActionItem label={"Open"} prefixIcon={<FolderOpenIcon/>} onClick={() => console.log("Open")}/>
                <MenuBarActionItem label={"Close"} onClick={() => console.log("Close")}/>
                <MenuBarSubMenuItem label={"Export"}>
                    <MenuBarSubMenuItem label={"Export as image"}>
                        <MenuBarActionItem label={"PNG"} onClick={() => console.log("Export as PNG")}/>
                        <MenuBarActionItem label={"JPG"} onClick={() => console.log("Export as JPG")}/>
                        <MenuBarActionItem label={"SVG"} onClick={() => console.log("Export as SVG")}/>
                    </MenuBarSubMenuItem>
                    <MenuBarActionItem label={"Export to PDF"} onClick={() => console.log("Export to PNG")}/>
                    <MenuBarActionItem label={"Export to CSV"} onClick={() => console.log("Export to SVG")}/>
                </MenuBarSubMenuItem>
                <MenuBarDividerItem/>
                <MenuBarActionItem label={"Save"} shortcut="Ctrl+S" onClick={() => console.log("Save")}/>
                <MenuBarActionItem label={"Save As"} shortcut="Ctrl+Shift+S" onClick={() => console.log("Save As")}/>
                <MenuBarDividerItem/>
            </MenuBarGroup>
            {/*<MenuBarGroup label="Project">*/}
            {/*</MenuBarGroup>*/}
            {/*<MenuBarGroup label="Settings"/>*/}
        </MenuBar>
    );
}

export default ApegApp;