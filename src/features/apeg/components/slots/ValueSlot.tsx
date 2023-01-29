import React from 'react';
import Slot, {SlotProps} from "./Slot";
import ValueSlider from "./ValueSlider";

interface ValueSlotProps extends Omit<SlotProps, "type"> {
    label: string;
}

const ValueSlot = ({label, ...slotProps}: ValueSlotProps) => {
    return (
        <Slot {...slotProps} type="scalar">
            <ValueSlider label={label} type="float" value={3} min={0} max={10}/>
        </Slot>
    );
}

export default ValueSlot;