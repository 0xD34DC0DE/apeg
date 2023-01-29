import React from 'react';
import 'reactflow/dist/style.css';
import {Container, Paper, Typography, useTheme} from "@mui/material";
import LabelSlot from "./LabelSlot";
import ValueSlot from "./slots/ValueSlot";
import VectorSlot from "./slots/VectorSlot";

interface BaseNodeProps {
    data: {
        label: string;
    };
}

const BaseNode = ({data}: BaseNodeProps) => {
    const theme = useTheme();

    return (
        <Paper>
            <Typography
                sx={{
                    backgroundColor: theme.palette.secondary.light,
                    borderTopLeftRadius: "inherit",
                    borderTopRightRadius: "inherit"
                }}
                style={{paddingLeft: 5, paddingRight: 5}}
                fontSize="small">
                {data.label}
            </Typography>

            <Container style={{paddingLeft: 7, paddingRight: 7, paddingTop: 5, paddingBottom: 5, minWidth: 140}}>
                <LabelSlot label={"Transform"} index={1} flow={"output"} type="matrix"/>
                <LabelSlot label={"Color"} index={2} flow={"output"} type="color"/>
                <div style={{height: 10}}/>
                <ValueSlot label={"Value"} index={3} flow={"input"}/>
                <LabelSlot label={"Color"} index={4} flow={"input"} type="color"/>
                <VectorSlot label={"Position"} index={5} flow={"input"} components={"rgb"}/>
            </Container>
        </Paper>
    );
}

export default BaseNode;