import React, {useRef, useState} from 'react';
import {Button, ClickAwayListener, Typography} from "@mui/material";
import MenuBarDropDown, {MenuBarItemProps} from "./MenuBarDropDown";

export interface MenuBarGroupProps<T> {
    label: string;
    children?: React.ReactElement<MenuBarItemProps<T>>[] | React.ReactElement<MenuBarItemProps<T>>;
}

const MenuBarGroup = <T, >({label, children}: MenuBarGroupProps<T>) => {
    const anchorRef = useRef<HTMLElement>(null);
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const [subMenuAnchor, setSubMenuAnchor] = useState<HTMLElement | null>(null);

    return (
        <ClickAwayListener onClickAway={() => {setAnchor(null); setSubMenuAnchor(null)}}>
            <div ref={anchorRef as React.RefObject<HTMLDivElement>}>
                <Button size="small"
                        sx={{
                            textTransform: "none",
                            minHeight: 0,
                            minWidth: 0,
                            paddingTop: .5,
                            paddingBottom: .5,
                            paddingLeft: 1,
                            paddingRight: 1
                        }}
                        onClick={() => setAnchor(anchorRef.current)}>
                    <Typography fontSize={"small"} justifyContent="center" sx={{px: 0}}>{label}</Typography>
                    {children &&
                        <MenuBarDropDown anchor={anchor}
                                         setSubMenuAnchor={setSubMenuAnchor}
                                         subMenuAnchor={subMenuAnchor}>
                            {children}
                        </MenuBarDropDown>
                    }
                </Button>
            </div>
        </ClickAwayListener>
    );
}

export default MenuBarGroup;