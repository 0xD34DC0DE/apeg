import React from 'react';
import {EdgeProps, getBezierPath} from "reactflow";
import {HandleType, handleTypeColors, handleTypeCompatibilities} from "./slots/HandleType";

interface TypedEdgeProps extends Omit<EdgeProps, "data"> {
    data?: {
        sourceType: HandleType;
        targetType: HandleType;
    }
}

const TypedEdge = ({
                       id,
                       sourceX,
                       sourceY,
                       targetX,
                       targetY,
                       sourcePosition,
                       targetPosition,
                       style,
                       data,
                       markerEnd
                   }: TypedEdgeProps) => {
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const [sourceColor, targetColor] = (() => {
        const sourceType = data?.sourceType?.split("-")[0] ?? "";
        const targetType = data?.targetType?.split("-")[0] ?? "";

        if(!(sourceType in handleTypeCompatibilities)) return ["red", "red"];

        const compatibilities = handleTypeCompatibilities[sourceType as HandleType];
        if(!compatibilities.includes(targetType as HandleType)){
            return ["red", "red"];
        }

        return [handleTypeColors[sourceType as HandleType], handleTypeColors[targetType as HandleType]];
    })();

    const gradientId = `Gradient${id}`

    return (
        <>
            <defs>
                <linearGradient id={gradientId}>
                    <stop offset="0%" stopColor={sourceColor}/>
                    <stop offset="100%" stopColor={targetColor}/>
                </linearGradient>
            </defs>
            <path
                id={id}
                style={{
                    ...style,
                    stroke: `url(#${gradientId})`,
                    strokeWidth: 2,
                }}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
        </>
    );
}

export default TypedEdge;