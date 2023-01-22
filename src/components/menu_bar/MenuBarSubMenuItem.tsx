import React, {useEffect, useRef, useState} from 'react';
import MenuBarActionItem from "./MenuBarActionItem";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MenuBarDropDown, {MenuBarItemProps} from "./MenuBarDropDown";
import HoverListener from "../HoverListener";

export interface MenuBarSubMenuItemProps<T> {
    label: string;
    icon?: React.ReactNode;
    children: React.ReactElement<MenuBarItemProps<T>>[] | React.ReactElement<MenuBarItemProps<T>>;
    setSubMenuAnchor?: (anchor: HTMLElement | null) => void;
    subMenuAnchor?: HTMLElement | null;
}

const MenuBarSubMenuItem = <T, >({
                                     label,
                                     icon,
                                     setSubMenuAnchor,
                                     subMenuAnchor,
                                     children
                                 }: MenuBarSubMenuItemProps<T>) => {
    const childSubMenuAnchorRef = useRef<HTMLElement>(null);
    const [childSubMenuAnchor, setChildSubMenuAnchor] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (!subMenuAnchor) {
            setChildSubMenuAnchor(null);
        }
    }, [subMenuAnchor]);

    /* TODO Make delay configurable*/
    return (
        <HoverListener onHover={() => setSubMenuAnchor && setSubMenuAnchor(childSubMenuAnchorRef.current)} delay={100}>
            <div ref={childSubMenuAnchorRef as React.RefObject<HTMLDivElement>}>
                <MenuBarActionItem label={label + "..."}
                                   onClick={e => e.stopPropagation()} // no click, only hover to prevent toggling of menu
                                   prefixIcon={icon}
                                   suffixIcon={<KeyboardArrowRightIcon/>}
                                   onMouseEnter={() => setSubMenuAnchor && setSubMenuAnchor(null)}>
                    <MenuBarDropDown anchor={subMenuAnchor ?? null}
                                     setSubMenuAnchor={setChildSubMenuAnchor}
                                     subMenuAnchor={childSubMenuAnchor}
                                     placement="right-start">
                        {children}
                    </MenuBarDropDown>
                </MenuBarActionItem>
            </div>
        </HoverListener>
    );
}

export default MenuBarSubMenuItem;