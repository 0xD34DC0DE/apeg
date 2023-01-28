import React from 'react';
import 'reactflow/dist/style.css';
import {Container, Paper, Typography, useTheme} from "@mui/material";
import LabelSlot from "./LabelSlot";
import ValueSlot from "./slots/ValueSlot";

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

            <Container style={{padding: 5, minWidth: 140}}>
                <ValueSlot label={"Value"} index={1} type={"input"}/>
                <LabelSlot label={"Color"} index={2} type={"input"}/>
                <LabelSlot label={"Color"} index={3} type={"output"}/>
            </Container>
        </Paper>
    );
}

export default BaseNode;