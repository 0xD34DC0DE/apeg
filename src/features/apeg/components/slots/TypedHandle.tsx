import React, {useEffect, useState} from 'react';
import {Handle, Position, useUpdateNodeInternals} from "reactflow";
import {useTheme} from "@mui/material";
import {HandleType, handleTypeColors} from "./HandleType";

interface TypedHandleProps {
    index: number;
    flow: "input" | "output";
    type: HandleType;
    anchor: React.RefObject<HTMLElement>;
}

const TypedHandle = ({index, flow, type, anchor}: TypedHandleProps) => {
    const theme = useTheme();
    const updateNodeInternals = useUpdateNodeInternals();
    const [handleTop, setHandleTop] = useState(0);
    const id = `${type}-${index.toString()}`

    const position = flow === "input" ? Position.Left : Position.Right;
    const handleType = flow === "input" ? "target" : "source";

    useEffect(() => {
        if (anchor.current) {
            setHandleTop(anchor.current.offsetTop + anchor.current.clientHeight / 2);
            setTimeout(() => updateNodeInternals(index.toString()), 0);
        }
    }, [anchor]);

    return (
        <Handle
            type={handleType}
            position={position}
            id={id}
            style={{
                top: handleTop,
                background: handleTypeColors[type],
                borderColor: theme.palette.background.default,
                borderWidth: .5,
                width: 9,
                height: 9,
            }}
            isValidConnection={(connection) => {
                if (connection.sourceHandle === connection.targetHandle) return false;
                return connection.source !== connection.target;
            }}
        />
    );
}

export default TypedHandle;