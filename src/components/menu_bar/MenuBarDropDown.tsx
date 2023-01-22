import React from 'react';
import {MenuBarDialogItemProps} from "./MenuBarDialogItem";
import {MenuBarActionItemProps} from "./MenuBarActionItem";
import {MenuBarDividerItemProps} from "./MenuBarDividerItem";
import MenuBarSubMenuItem, {MenuBarSubMenuItemProps} from "./MenuBarSubMenuItem";
import {Fade, Paper, Popper} from "@mui/material";
import {PopperPlacementType} from "@mui/material/Popper";

interface MenuBarDropDownProps<T> {
    anchor: HTMLElement | null;
    placement?: PopperPlacementType;
    children?: React.ReactElement<MenuBarItemProps<T>> | React.ReactElement<MenuBarItemProps<T>>[];
    setSubMenuAnchor?: (anchor: HTMLElement | null) => void;
    subMenuAnchor?: HTMLElement | null;
}

export type MenuBarItemProps<T> =
    MenuBarDialogItemProps<T>
    | MenuBarActionItemProps
    | MenuBarSubMenuItemProps<T>
    | MenuBarDividerItemProps;

const MenuBarDropDown = <T, >({
                                  anchor,
                                  placement = "bottom-start",
                                  setSubMenuAnchor,
                                  subMenuAnchor,
                                  children
                              }: MenuBarDropDownProps<T>) => {
        const open = Boolean(anchor);
        return (
            <Popper open={open} anchorEl={anchor} placement={placement} transition>
                {({TransitionProps}) => (
                    <Fade {...TransitionProps} timeout={150}>
                        <Paper style={{paddingLeft: 0, paddingRight: 0, paddingTop: 4, paddingBottom: 4}}>
                            {children &&
                                React.Children.map(children, (child: React.ReactElement<MenuBarItemProps<T>>) => {
                                    if (React.isValidElement(child) && typeof child.type !== "string") {
                                        if (child.type.name === "MenuBarSubMenuItem") {
                                            const props = child.props as MenuBarSubMenuItemProps<T>;
                                            return <MenuBarSubMenuItem label={props.label}
                                                                       icon={props.icon}
                                                                       setSubMenuAnchor={setSubMenuAnchor}
                                                                       subMenuAnchor={subMenuAnchor}
                                                                       children={props.children}/>
                                        } else {
                                            return React.cloneElement(child, {
                                                onMouseEnter: () => setSubMenuAnchor && setSubMenuAnchor(null)
                                            });
                                        }
                                    }
                                })
                            }
                        </Paper>
                    </Fade>
                )}
            </Popper>
        );
    }
;

export default MenuBarDropDown;