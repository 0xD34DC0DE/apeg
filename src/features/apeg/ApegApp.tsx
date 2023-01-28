import React from 'react';
// @ts-ignore
import {ReactComponent as ApegAppIcon} from '../../assets/kaaba.svg'
import {Stack, SvgIcon} from "@mui/material";
import ApegMenuBar from "./components/ApegMenuBar";
import EditorContainer from "./components/EditorContainer";
import * as NodeEditor from "./components/NodeEditor";
import Editor from "./components/Editor";

export const apeg_route: string = "apeg/*";
export const apeg_name: string = "Apeg";
export const apeg_icon = <SvgIcon component={ApegAppIcon} inheritViewBox color="secondary" sx={{fontSize: 128}}/>

const ApegApp = () => {
    return (
        <Stack height={1}>
            <ApegMenuBar/>
            <EditorContainer>
                <Editor name={NodeEditor.node_editor_name} icon={NodeEditor.node_editor_icon}
                        element={<NodeEditor.default/>}/>
            </EditorContainer>
        </Stack>
    );
}

export default ApegApp;