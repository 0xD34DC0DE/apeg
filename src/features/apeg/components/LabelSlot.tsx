import React from 'react';
import Slot, {SlotProps} from "./slots/Slot";
import {Typography} from "@mui/material";

interface LabelSlotProps extends SlotProps {
    label: string;
}

const LabelSlot = ({label, ...slotProps}: LabelSlotProps) => {
    const textAlignment = slotProps.flow === "input" ? "left" : "right";

    return (
        <Slot {...slotProps}>
            <Typography fontSize="small" textAlign={textAlignment}>{label}</Typography>
        </Slot>

    );
}

export default LabelSlot;