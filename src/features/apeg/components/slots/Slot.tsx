import React, {useEffect, useRef, useState} from 'react';
import {Handle, Position, useUpdateNodeInternals} from "reactflow";
import {Stack} from "@mui/material";

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
        <>
            <Handle type={handleType} position={position} id={index.toString()} style={{top: handleTop}}/>
            <Stack spacing={.5}>
                {children &&
                    React.Children.map(children, (child, i) => {
                        if (React.isValidElement(child)) {
                            if (i == 0) {
                                console.log("wrap")
                                return <div ref={slotRef as React.RefObject<HTMLDivElement>}>
                                    <child.type {...child.props}/>
                                </div>
                            } else {
                                return <child.type {...child.props}/>
                            }
                        }
                    })
                }
            </Stack>
        </>
    );
}

export default Slot;