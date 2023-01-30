import React, {useCallback} from 'react';
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
import TypedEdge from "./TypedEdge";

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

const initialEdges: Edge[] = [
    {
        id: 'e1-2',
        source: '1',
        target: '2',
        sourceHandle: 'color-2',
        targetHandle: 'color-4',
        data: {sourceType: "color", targetType: "color"}
    }
];

interface NodeEditorViewPortProps {

}

const nodeTypes = {base: BaseNode};
const edgeTypes = {default: TypedEdge};

const NodeEditorViewPort = ({}: NodeEditorViewPortProps) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback((params: Edge | Connection) => {
        setEdges((eds) => addEdge({
            ...params,
            data: {
                sourceType: params.sourceHandle?.split("-")[0],
                targetType: params.targetHandle?.split("-")[0]
            }
        }, eds))
    }, [setEdges]);

    return (
        <Box width={1} height={1}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
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