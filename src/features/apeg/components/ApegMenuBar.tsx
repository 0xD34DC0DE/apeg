import React from 'react';
// @ts-ignore
import {ReactComponent as FolderOpenIcon} from '../../../assets/folder-open.svg'
import MenuBar from "../../../components/menu_bar/MenuBar";
import MenuBarGroup from "../../../components/menu_bar/MenuBarGroup";
import MenuBarActionItem from "../../../components/menu_bar/MenuBarActionItem";
import MenuBarDividerItem from "../../../components/menu_bar/MenuBarDividerItem";
import MenuBarSubMenuItem from "../../../components/menu_bar/MenuBarSubMenuItem";

interface ApegMenuBarProps {
}

const ApegMenuBar = ({}: ApegMenuBarProps) => {
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
            <MenuBarGroup label="Project">
                <MenuBarSubMenuItem label={"New"}>
                    <MenuBarActionItem label={"New Project"} onClick={() => console.log("New Project")}/>
                    <MenuBarActionItem label={"New File"} onClick={() => console.log("New File")}/>
                </MenuBarSubMenuItem>
                <MenuBarActionItem label={"Open"} onClick={() => console.log("Open")}/>
                <MenuBarActionItem label={"Close"} onClick={() => console.log("Close")}/>
            </MenuBarGroup>
            <MenuBarGroup label="Settings"/>
        </MenuBar>
    );
}

export default ApegMenuBar;