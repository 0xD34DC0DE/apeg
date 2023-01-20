import React, {useEffect, useState} from "react";

type Hoverable = {
    onMouseEnter: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave: (event: React.MouseEvent<HTMLElement>) => void;
}

interface HoverListenerProps<T> {
    children: React.ReactElement<Hoverable> | React.ReactElement<Hoverable>[];
    delay: number;
    onHover: (event: React.MouseEvent<HTMLElement>) => void;
    onHoverEnd?: () => void;
}

const HoverListener = <T, >({children, delay, onHover, onHoverEnd}: HoverListenerProps<T>) => {
    const [hoverEvent, setHoverEvent] = useState<React.MouseEvent<HTMLElement> | null>(null);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        hoverEvent && setTimer(setTimeout(() => hoverEvent && onHover(hoverEvent), delay));
    }, [hoverEvent]);

    const handleMouseLeave = () => {
        hoverEvent && onHoverEnd && onHoverEnd();
        hoverEvent && setHoverEvent(null);
        timer && clearTimeout(timer);
        setTimer(null);
    }

    return (
        <>
            {
                React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                            onMouseEnter: (event: React.MouseEvent<HTMLElement>) => {
                                event.stopPropagation();
                                let newVar = {...event};
                                setHoverEvent(newVar);
                            },
                            onMouseLeave: handleMouseLeave
                        } as Hoverable);
                    }
                })
            }
        </>
    );
}

export default HoverListener;