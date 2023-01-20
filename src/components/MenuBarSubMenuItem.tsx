import React, {useContext, useEffect} from 'react';
import MenuBarActionItem from "./MenuBarActionItem";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MenuBarDropDown, {MenuBarItemProps} from "./MenuBarDropDown";
import {useAnchorPopup} from "../hooks/AnchorPopupHook";
import HoverListener from "./HoverListener";
import {NestedDropdownContext} from "./NestedDropdownContextProvider";

export interface MenuBarSubMenuItemProps<T> {
    label: string;
    nestingLevel?: number;
    icon?: React.ReactNode;
    children: React.ReactElement<MenuBarItemProps<T>>[] | React.ReactElement<MenuBarItemProps<T>>;
}

const MenuBarSubMenuItem = <T, >({label, nestingLevel, icon, children}: MenuBarSubMenuItemProps<T>) => {
    const [anchorProps, handleOpen] = useAnchorPopup();
    const nestingContext = useContext(NestedDropdownContext);

    useEffect(() => {
        nestingContext.registerNestedElement({
            nestingLevel: nestingLevel ?? -1,
            close: anchorProps.handleClose
        });
    }, []);


    /*TODO Make delay configurable*/
    return (
        <HoverListener onHover={handleOpen} delay={200}>
            <MenuBarActionItem label={label + "..."}
                               onClick={e => e.stopPropagation()} // no click, only hover to prevent toggling of menu
                               prefixIcon={icon}
                               suffixIcon={<KeyboardArrowRightIcon/>}
                               onMouseLeave={() => nestingContext.onHoveredItemChanged(nestingLevel)}
                               nestingLevel={nestingLevel}>
                <MenuBarDropDown nestingLevel={nestingLevel ?? -1} {...anchorProps} placement="right-start">
                    {children &&
                        React.Children.map(children, (child: React.ReactElement<MenuBarItemProps<T>>) => {
                            if (React.isValidElement(child)) {
                                return React.cloneElement(child, {
                                    nestingLevel: nestingLevel
                                });
                            }
                        })
                    }
                </MenuBarDropDown>
            </MenuBarActionItem>
        </HoverListener>
    );
}

export default MenuBarSubMenuItem;