import React, {useState} from 'react';

export type ReturnType = [
    {
        anchor: HTMLElement | null;
        open: boolean,
        handleClose: () => void,
    },
    (event: React.MouseEvent<HTMLElement>) => void
];

export const useAnchorPopup = (): ReturnType => {
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    const open = Boolean(anchor);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchor(event.currentTarget);

    const handleClose = () => setAnchor(null);

    return [{anchor, open, handleClose}, handleOpen];
}