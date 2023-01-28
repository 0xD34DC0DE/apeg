import React, {useState, useRef} from 'react';
import {useOnViewportChange} from "reactflow";

export interface MouseDragEvent extends React.MouseEvent<HTMLDivElement> {
    localX: number;
    localY: number;
    deltaX: number;
    deltaY: number;
    percentageX: number;
    percentageY: number;
    clampedPercentageX: number;
    clampedPercentageY: number;
}

interface DragListenerProps {
    active?: boolean;
    onDragStart?: (evt: React.MouseEvent<HTMLDivElement>) => void;
    onDragEnd?: (evt: React.MouseEvent<HTMLDivElement>) => void;
    onDrag?: (evt: MouseDragEvent) => void;
    onClick?: (evt: React.MouseEvent<HTMLDivElement>) => void;
    children: React.ReactNode | React.ReactNode[] | null;
}

const SliderListener = ({active = true, onDragStart, onDragEnd, onDrag, onClick, children}: DragListenerProps) => {
    const [onPointerMove, setOnPointerMove] = useState<((evt: React.PointerEvent<HTMLDivElement>) => void) | null>(null);
    const ref = useRef<HTMLDivElement>(null);
    const lastPos = useRef<{ x: number, y: number }>({x: 0, y: 0});
    const initialPos = useRef<{ x: number, y: number }>({x: 0, y: 0});
    let rect: DOMRect | null = null;
    let rectDirty = true;

    useOnViewportChange({onChange: () => rectDirty = true});

    const updateRectIfDirty = () => {
        if (!rectDirty) return;
        rect = ref.current!.getBoundingClientRect();
        rectDirty = false;
    };

    const getLocalMousePos = (evt: React.PointerEvent<HTMLDivElement>) => {
        updateRectIfDirty();
        return {x: evt.clientX - rect!.left, y: evt.clientY - rect!.top};
    };

    const handlePointerDown = (evt: React.PointerEvent<HTMLDivElement>) => {
        if (!active) return;
        setOnPointerMove(() => handleMouseMove);
        initialPos.current = getLocalMousePos(evt);
        onDragStart && onDragStart(evt);
        ref.current!.setPointerCapture(evt.pointerId);
    }

    const handlePointerUp = (evt: React.PointerEvent<HTMLDivElement>) => {
        setOnPointerMove(null);

        const {x, y} = getLocalMousePos(evt);

        const isXSame = Math.abs(x - initialPos.current.x) < 1;
        const isYSame = Math.abs(y - initialPos.current.y) < 1;

        if (isXSame && isYSame) {
            onClick && onClick(evt);
        } else {
            onDragEnd && onDragEnd(evt);
        }

        ref.current!.releasePointerCapture(evt.pointerId);
    }

    const handleMouseMove = (evt: React.PointerEvent<HTMLDivElement>) => {
        updateRectIfDirty();
        lastPos.current = getLocalMousePos(evt);
        onDrag && onDrag({
            ...evt,
            localX: evt.clientX - rect!.left,
            localY: evt.clientY - rect!.top,
            deltaX: evt.clientX - rect!.left - lastPos.current.x,
            deltaY: evt.clientY - rect!.top - lastPos.current.y,
            percentageX: (evt.clientX - rect!.left) / rect!.width,
            percentageY: (evt.clientY - rect!.top) / rect!.height,
            clampedPercentageX: Math.min(Math.max((evt.clientX - rect!.left) / rect!.width, 0), 1),
            clampedPercentageY: Math.min(Math.max((evt.clientY - rect!.top) / rect!.height, 0), 1)
        });
    }

    return (
        <div onPointerDown={handlePointerDown}
             onPointerUp={handlePointerUp}
             onPointerMove={onPointerMove ?? undefined}
             style={{cursor: "pointer"}}
             ref={ref as React.RefObject<HTMLDivElement>}>
            {children}
        </div>
    );
}

export default SliderListener;