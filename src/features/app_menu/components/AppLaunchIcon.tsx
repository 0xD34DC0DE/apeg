import React from 'react';
import {Button, Container, Paper, Typography} from "@mui/material";

interface AppLaunchIconProps {
    name: string;
    icon?: React.ReactNode;
    onClick?: () => void;
}

const AppLaunchIcon = ({name, icon, onClick}: AppLaunchIconProps) => {
    return (
        <Button onClick={onClick} sx={{textTransform: "none"}}>
            <Paper variant="outlined" onClick={onClick} sx={{py: 1}}>
                <Container>
                    {icon}
                    <Container>
                        <Typography variant="h6" align="center">{name}</Typography>
                    </Container>
                </Container>
            </Paper>
        </Button>
    );
}

export default AppLaunchIcon;