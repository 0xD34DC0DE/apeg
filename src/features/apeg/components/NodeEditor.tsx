import React from 'react';
//@ts-ignore
import {ReactComponent as NodeEditorIcon} from '../../../assets/node_editor.svg';
import {Stack, SvgIcon, Typography} from "@mui/material";
import NodeEditorViewPort from "./NodeEditorViewPort";

export const node_editor_name = "Node Editor";
export const node_editor_icon = <SvgIcon component={NodeEditorIcon} inheritViewBox color="secondary"
                                         sx={{fontSize: 42}}/>

const NodeEditor = () => {
    return (
        <Stack direction="row" height={1}>
            <Stack direction="column" justifyContent="start" alignItems={"center"}>
                <Typography variant="h5">Nodes</Typography>
            </Stack>
            <NodeEditorViewPort/>
        </Stack>
    );
}

export default NodeEditor;