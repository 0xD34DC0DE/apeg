import React, {useState} from 'react';
//@ts-ignore
import {ReactComponent as NodeEditorIcon} from '../../../assets/node_editor.svg';
import {Stack, SvgIcon, Typography, useTheme} from "@mui/material";
import NodeEditorViewPort from "./NodeEditorViewPort";
import NodeEditorTabs from "./NodeEditorTabs";

export const node_editor_name = "Node Editor";
export const node_editor_icon = <SvgIcon component={NodeEditorIcon} inheritViewBox color="secondary"
                                         sx={{fontSize: 42}}/>

const NodeEditor = () => {
    const theme = useTheme();
    const [tabs, setTabs] = useState([
        {
            name: "Graph 1",
            graphId: "graph1",
            dirty: true
        },
        {
            name: "Graph 2",
            graphId: "graph2",
            dirty: false
        },
        {
            name: "Graph 3",
            graphId: "graph3",
            dirty: false
        }
    ]);

    const handleTabChange = (graphId: string) => {
        console.log(graphId);
    }

    const handleCloseTab = (graphId: string) => {
        setTabs(tabs.filter(tab => tab.graphId !== graphId));
    }

    return (
        <Stack direction="row" height={1}>
            <Stack direction="column"
                   justifyContent="start"
                   alignItems={"center"}
                   sx={{
                       border: `1px solid ${theme.palette.divider}`,
                       p: 1,
                       minWidth: 200,
                   }}>
                <Typography variant="h5">Nodes</Typography>
            </Stack>

            <Stack direction="column" width={1}>
                <NodeEditorTabs tabs={tabs} onTabChange={handleTabChange} closeTab={handleCloseTab}/>
                <NodeEditorViewPort/>
            </Stack>
        </Stack>
    );
}

export default NodeEditor;