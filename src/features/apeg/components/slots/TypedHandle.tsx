import React, {useEffect, useState} from 'react';
import {Handle, Position, useUpdateNodeInternals} from "reactflow";
import {useTheme} from "@mui/material";

export type HandleType = "color" | "vector" | "matrix" | "scalar" | "string" | "boolean" | "object";

interface TypedHandleProps {
    index: number;
    flow: "input" | "output";
    type: HandleType;
    anchor: React.RefObject<HTMLElement>;
}

const handleTypeColors = {
    color: "#c7c729",
    vector: "#6363c7",
    matrix: "#ff904f",
    scalar: "#a1a1a1",
    string: "#70b2ff",
    boolean: "#cca6d6",
    object: "#00d6a3",
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
                if (connection.source === connection.target) return false;

                const sourceType = connection?.sourceHandle?.split("-")[0] ?? "";
                const targetType = connection?.targetHandle?.split("-")[0] ?? "";

                return sourceType === targetType;
            }}
        />
    );
}

export default TypedHandle;