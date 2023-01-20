import React from 'react';
import {SxProps, Typography, useTheme} from "@mui/material";
import {Theme} from "@mui/material/styles";

type ShortcutAlphabetic =
    "A"
    | "B"
    | "C"
    | "D"
    | "E"
    | "F"
    | "G"
    | "H"
    | "I"
    | "J"
    | "K"
    | "L"
    | "M"
    | "N"
    | "O"
    | "P"
    | "Q"
    | "R"
    | "S"
    | "T"
    | "U"
    | "V"
    | "W"
    | "X"
    | "Y"
    | "Z";

type ShortcutNumeric = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type ShortcutFunction = "F1" | "F2" | "F3" | "F4" | "F5" | "F6" | "F7" | "F8" | "F9" | "F10" | "F11" | "F12";
type ShortcutNumpadNumeric =
    "Numpad0"
    | "Numpad1"
    | "Numpad2"
    | "Numpad3"
    | "Numpad4"
    | "Numpad5"
    | "Numpad6"
    | "Numpad7"
    | "Numpad8"
    | "Numpad9";
type ShortcutNumpadSymbol =
    "NumpadAdd"
    | "NumpadSubtract"
    | "NumpadMultiply"
    | "NumpadDivide"
    | "NumpadDecimal"
    | "NumpadEnter";
type ShortcutArrow = "Right" | "Left" | "Up" | "Down";
type ShortcutNavigation = "Home" | "End" | "PageUp" | "PageDown";
type ShortcutSpecial = "PrintScreen" | "ScrollLock" | "Pause"
type ShortcutEditing = "Backspace" | "Delete" | "Insert" | "Tab" | "Enter" | "Escape" | "Space";
type ShortcutLeftModifier = "Ctrl" | "Alt" | "Shift" | "Meta";
type ShortcutRightModifier = "RightCtrl" | "RightAlt" | "RightShift";
type ShortcutSymbol =
    "+"
    | "-"
    | "*"
    | "/"
    | "."
    | ","
    | "="
    | "("
    | ")"
    | "["
    | "]"
    | "{"
    | "}"
    | "<"
    | ">"
    | "!"
    | "?"
    | ":"
    | ";"
    | "'"
    | "\""
    | "\\"
    | "|"
    | "&"
    | "^"
    | "%"
    | "$"
    | "#"
    | "@"
    | "~"
    | "`"
    | "_";

export type ShortcutModifier = ShortcutLeftModifier | ShortcutRightModifier;
export type ShortcutKey = ShortcutAlphabetic
    | ShortcutNumeric
    | ShortcutFunction
    | ShortcutNumpadNumeric
    | ShortcutNumpadSymbol
    | ShortcutArrow
    | ShortcutNavigation
    | ShortcutSpecial
    | ShortcutEditing
    | ShortcutSymbol;

export type ShortcutType =
    `${ShortcutKey}`
    | `${ShortcutModifier}+${ShortcutKey}`
    | `${ShortcutModifier}+${ShortcutModifier}+${ShortcutKey}`;

interface ShortcutProps {
    shortcut: ShortcutType;
    sx?: SxProps<Theme>;
}

const shortcutsWithBackground: string[] = [
    "Ctrl",
    "Alt",
    "Shift",
    "Meta",
    "RightCtrl",
    "RightAlt",
    "RightShift",
];

const Shortcut = ({sx, shortcut}: ShortcutProps) => {
    const theme = useTheme();
    const shortcutParts = shortcut.split("+");
    return (
        <Typography sx={sx} variant="body2" color="text.secondary">
            {
                shortcutParts.map((shortcutPart, index) => {
                    const plus = index < shortcutParts.length - 1 ? "+" : "";

                    if (shortcutsWithBackground.includes(shortcutPart)) {
                        return <React.Fragment key={index}>
                            <span style={{
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                paddingLeft: 3,
                                paddingRight: 4,
                                borderRadius: 3,
                            }}>{shortcutPart}</span>
                            {plus != "" && <span style={{paddingLeft: 2, paddingRight: 2}}>{plus}</span>}
                        </React.Fragment>
                    }

                    return <span key={index}>{shortcutPart}</span>
                })
            }
        </Typography>
    );
}

export default Shortcut;