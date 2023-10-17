// Next
import { useState } from 'react'
import { createTheme } from '@mui/material/styles';
import { green, purple, amber, grey, deepOrange } from '@mui/material/colors';

// Font
import '@fontsource/bungee-inline';

export const theme = createTheme({
    typography: {
        fontFamily: "'Bungee Inline', sans-serif"
    },
    palette: {
        primary: {
        main: grey[200],
        },
        secondary: {
        main: green[500],
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                        color: '#000000DE',
                        borderColor: '#ffffff'
                    },
                    '&.Mui-error': {
                        borderColor: '#ffffff'
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: ".5rem"
                }
            }
        }
    },
});