import React, {useCallback, useMemo} from 'react';
import {Box} from "@mui/material";
import ReactFlow, {
    addEdge,
    Background,
    Connection,
    Controls,
    Edge,
    MiniMap,
    Node,
    Position,
    useEdgesState,
    useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import BaseNode from "./BaseNode";

const initialNodes: Node[] = [
    {
        id: '1',
        type: 'base',
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        position: {x: 0, y: 0},
        data: {label: 'Testing Node'}
    },
    {
        id: '2',
        type: 'base',
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        position: {x: 200, y: 0},
        data: {label: 'Testing Node2'}
    },
];

const initialEdges = [
    {id: 'e1-2', source: '1', target: '2', sourceHandle: 'color-2', targetHandle: 'color-4'}
];

interface NodeEditorViewPortProps {

}

const NodeEditorViewPort = ({}: NodeEditorViewPortProps) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
    const nodeTypes = useMemo(() => ({base: BaseNode}), []);


    return (
        <Box width={1}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                maxZoom={5}
            >
                <MiniMap/>
                <Controls/>
                <Background/>
            </ReactFlow>
        </Box>
    );
}

export default NodeEditorViewPort;