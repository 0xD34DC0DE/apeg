import React, {useRef, useState} from 'react';
import {ClickAwayListener, Paper, Stack, TextField, Typography, useTheme} from "@mui/material";
import SliderListener, {MouseDragEvent} from "../SliderListener";
import {useOnViewportChange, useReactFlow} from "reactflow";


interface ValueSliderProps {
    type: "int" | "float";
    label: string;
    min: ValueSliderProps["type"] extends "int" ? bigint : number;
    max: ValueSliderProps["type"] extends "int" ? bigint : number;
    value?: ValueSliderProps["type"] extends "int" ? bigint : number;
    increment?: ValueSliderProps["type"] extends "int" ? bigint : number;
    snapToIncrement?: boolean;
    outOfRangeAllowed?: boolean;
}

const ValueSlider = ({
                         type,
                         label,
                         min,
                         max,
                         value = 0,
                         increment = 1,
                         outOfRangeAllowed = true,
                         snapToIncrement = false
                     }: ValueSliderProps) => {
    const theme = useTheme();
    const [sliderValue, setSliderValue] = useState(value);
    const [inputMode, setInputMode] = useState<"drag" | "keyboard">("drag");
    const containerRef = useRef<HTMLDivElement>(null);
    const currentZoom = useReactFlow().getZoom();
    const fillPercentage = ((sliderValue - min) / (max - min) * 100).toFixed(2);
    const fillColor = theme.palette.primary.light;
    const gradient = `linear-gradient(90deg, ${fillColor} ${fillPercentage}%, rgb(0,0,0,0) ${fillPercentage}%)`;
    const background = inputMode == "drag" ? gradient : theme.palette.background.default;

    useOnViewportChange({
        onStart: () => {
            if (inputMode == "keyboard") setInputMode("drag");
        }
    });

    const handleDrag = (event: MouseDragEvent) => {
        let newValue = event.clampedPercentageX * (max - min) + min;
        if (type === "int") {
            newValue = Math.round(newValue);
        }
        if (snapToIncrement) {
            newValue = Math.round(newValue / increment) * increment;
        }
        if (!outOfRangeAllowed) {
            newValue = Math.min(Math.max(newValue, min), max);
        }
        setSliderValue(newValue);
    }

    return (
        <ClickAwayListener onClickAway={() => setInputMode("drag")}>
            <div ref={containerRef as React.RefObject<HTMLDivElement>}>
                <SliderListener active={inputMode == "drag"}
                                onDrag={handleDrag}
                                onDragEnd={() => {
                                    if (inputMode == "drag") setInputMode("drag");
                                }}
                                onClick={() => setInputMode("keyboard")}>
                    <Paper sx={{background: background, border: 1, borderColor: theme.palette.primary.dark}}
                           className={"nodrag"}>
                        {inputMode == "drag" &&
                            <Stack direction="row" justifyContent={"space-between"} sx={{px: 1}}>
                                <Typography fontSize="small">{label}</Typography>
                                <Typography fontSize="small">{sliderValue?.toFixed(2)}</Typography>
                            </Stack>
                        }
                        {inputMode == "keyboard" &&
                            <div style={{lineHeight: 1}}>
                                <TextField
                                    value={sliderValue?.toFixed(10).replace(/\.?0+$/, "")}
                                    autoFocus
                                    variant="filled"
                                    size="small"
                                    hiddenLabel
                                    inputProps={{
                                        style: {
                                            fontSize: "small",
                                            paddingTop: .5,
                                            paddingBottom: .5,
                                            paddingLeft: 8,
                                            margin: 0,
                                        }
                                    }}
                                    InputProps={{disableUnderline: true,}}
                                    style={{
                                        width: containerRef.current!.getBoundingClientRect().width / currentZoom - 2
                                    }}
                                    onChange={(evt) => {
                                        console.log(evt.target.value);
                                    }}
                                    onFocus={() => {
                                        // select all text on focus
                                        const input = document.activeElement as HTMLInputElement;
                                        input.setSelectionRange(0, input.value.length);
                                    }}/>
                            </div>
                        }
                    </Paper>
                </SliderListener>
            </div>
        </ClickAwayListener>
    );
}

export default ValueSlider;