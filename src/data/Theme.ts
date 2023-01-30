import {ThemeOptions} from '@mui/material/styles';

const theme: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#c2c2c2',
            light: '#5e5e5e',
            dark: '#4c4c4c',
        },
        secondary: {
            main: '#ef5350',
            light: '#ff867c',
            dark: '#b61827',
        },
        text: {
           secondary: '#ffffff',
           disabled: '#4e4e4e',
           primary: '#fdfdfd',
        },
        background: {
            default: '#1e1e1e',
            paper: '#2e2e2e',
        },

    }
};

export default theme;