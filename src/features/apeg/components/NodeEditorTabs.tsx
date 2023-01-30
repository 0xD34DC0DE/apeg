import React, {useState} from 'react';
import {IconButton, Tab, Tabs, Typography, useTheme} from "@mui/material";
import Close from '@mui/icons-material/Close';

interface NodeEditorTabsProps {
    tabs: {
        name: string;
        graphId: string;
        dirty: boolean;
    }[];
    onTabChange: (graphId: string) => void;
    closeTab: (graphId: string) => void;
}

const NodeEditorTabs = ({tabs, onTabChange, closeTab}: NodeEditorTabsProps) => {
    const theme = useTheme();
    const [value, setValue] = useState(tabs[0].graphId);
    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        onTabChange(newValue);
    };

    return (
        <Tabs onChange={handleTabChange}
              value={value}
              sx={{
                  minHeight: 0,
                  borderTop: `1px solid ${theme.palette.divider}`,
                  borderBottom: `1px solid ${theme.palette.divider}`,
              }}>
            {
                tabs.map((tab, index) =>
                    <Tab
                        label={
                            <Typography display={"inline"}>
                                {`${tab.name} ${tab.dirty ? "*  " : ""}`}
                                <IconButton
                                    size="small"
                                    sx={{p: 0, minWidth: 0, minHeight: 0}}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        closeTab(tab.graphId);
                                    }}>
                                    <Close sx={{fontSize: "16px"}}/>
                                </IconButton>
                            </Typography>
                        }
                        key={index}
                        value={tab.graphId}
                        sx={{
                            fontSize: "small",
                            "&.MuiTab-root": {
                                m: 0,
                                p: 1,
                                minHeight: 0,
                            },
                            "&.MuiButtonBase-root": {
                                minHeight: 0,
                                borderRight: `1px solid ${theme.palette.divider}`,
                                textTransform: "none",
                            }
                        }}
                    />
                )
            }
        </Tabs>
    );
}

export default NodeEditorTabs;