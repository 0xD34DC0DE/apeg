import React, {useEffect, useRef, useState} from 'react';
import {Handle, Position, useUpdateNodeInternals} from "reactflow";

export interface SlotProps {
    index: number;
    type: "input" | "output";
    children?: React.ReactNode;
}

const Slot = ({index, type, children}: SlotProps) => {
    const slotRef = useRef<HTMLElement>(null);
    const [handleTop, setHandleTop] = useState(0);
    const updateNodeInternals = useUpdateNodeInternals();

    const position = type === "input" ? Position.Left : Position.Right;
    const handleType = type === "input" ? "target" : "source";

    useEffect(() => {
        if (slotRef.current) {
            setHandleTop(slotRef.current.offsetTop + slotRef.current.clientHeight / 2);
            setTimeout(() => updateNodeInternals(index.toString()), 0);
        }
    }, [slotRef]);

    return (
        <div ref={slotRef as React.RefObject<HTMLDivElement>}>
            <Handle type={handleType} position={position} id={index.toString()} style={{top: handleTop}}/>
            {children}
        </div>
    );
}

export default Slot;