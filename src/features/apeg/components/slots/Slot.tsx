import React, {useRef} from 'react';
import {Stack} from "@mui/material";
import TypedHandle from "./TypedHandle";
import {HandleType} from "./HandleType";

export interface SlotProps {
    index: number;
    flow: "input" | "output";
    type: HandleType;
    children?: React.ReactNode;
}

const Slot = ({index, flow, type, children}: SlotProps) => {
    const firstChildRef = useRef<HTMLElement>(null);

    return (
        <>
            <TypedHandle flow={flow} type={type} index={index} anchor={firstChildRef}/>
            <Stack spacing={.5}>
                {children &&
                    React.Children.map(children, (child, i) => {
                        if (React.isValidElement(child)) {
                            if (i == 0) {
                                return <div ref={firstChildRef as React.RefObject<HTMLDivElement>}>
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