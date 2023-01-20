import React from 'react';
import {MenuBarDialogItemProps} from "./MenuBarDialogItem";
import {MenuBarActionItemProps} from "./MenuBarActionItem";
import {MenuBarDividerItemProps} from "./MenuBarDividerItem";
import {MenuBarSubMenuItemProps} from "./MenuBarSubMenuItem";
import {ClickAwayListener, Fade, Paper, Popper} from "@mui/material";
import {PopperPlacementType} from "@mui/material/Popper";

interface MenuBarDropDownProps<T> {
    open: boolean;
    nestingLevel: number;
    anchor: HTMLElement | null;
    handleClose: () => void;
    placement?: PopperPlacementType;
    children?: React.ReactElement<MenuBarItemProps<T>> | React.ReactElement<MenuBarItemProps<T>>[];
}

export type MenuBarItemProps<T> =
    MenuBarDialogItemProps<T>
    | MenuBarActionItemProps
    | MenuBarSubMenuItemProps<T>
    | MenuBarDividerItemProps;

const MenuBarDropDown = <T, >({
                                  open,
                                  nestingLevel,
                                  anchor,
                                  handleClose,
                                  placement = "bottom-start",
                                  children
                              }: MenuBarDropDownProps<T>) => {
    return (
        <Popper open={open} anchorEl={anchor} placement={placement} transition>
            {({TransitionProps}) => (
                <ClickAwayListener onClickAway={handleClose}>
                    <Fade {...TransitionProps} timeout={100}>
                        <Paper style={{paddingLeft: 0, paddingRight: 0, paddingTop: 4, paddingBottom: 4}}>
                            {children &&
                                React.Children.map(children, (child: React.ReactElement<MenuBarItemProps<T>>) => {
                                    if (React.isValidElement(child)) {
                                        return React.cloneElement(child, {
                                            nestingLevel: nestingLevel + 1
                                        });
                                    }
                                })
                            }
                        </Paper>
                    </Fade>
                </ClickAwayListener>
            )}
        </Popper>
    );
};

export default MenuBarDropDown;