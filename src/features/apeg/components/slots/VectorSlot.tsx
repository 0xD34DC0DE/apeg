import React from 'react';
import Slot, {SlotProps} from "./Slot";
import ValueSlider from "./ValueSlider";
import {Typography} from "@mui/material";

interface VectorSlotProps extends SlotProps {
    label: string;
    components: "uv" | "rgb" | "rgba" | "2d" | "3d" | "4d";
}

const VectorSlot = ({label, components, ...slotProps}: VectorSlotProps) => {

    const getComponents = (components: string) => {
        if (components === "uv" || components === "rgb" || components === "rgba") {
            return components.split("");
        }
        return ["x", "y", "z", "w"].slice(0, components.length);
    }

    return (
        <Slot {...slotProps}>
            <Typography fontSize={"small"}>{label}:</Typography>
            {
                getComponents(components).map((component, index) => {
                    return (
                        <ValueSlider
                            key={index}
                            label={component}
                            type="float"
                            value={3}
                            min={0}
                            max={10}
                        />
                    );
                })
            }
        </Slot>
    );
}

export default VectorSlot;