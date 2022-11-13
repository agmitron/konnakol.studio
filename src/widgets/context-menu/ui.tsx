import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import { Menu, SvgIconTypeMap, SxProps, Theme } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface MenuItem {
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  text: string;
  shortcut?: string;
  action?: Function;
}

export type SoundsContextMenuGroups = MenuItem[][];

interface Props {
  groups: SoundsContextMenuGroups;
  isOpen: boolean;
  anchor: HTMLElement | null;
  onClose?: () => void;
  style?: SxProps<Theme>;
}

const ContextMenu: React.FC<Props> = ({
  groups,
  style,
  isOpen,
  anchor,
  onClose,
}) => {
  return (
    <Paper sx={{ maxWidth: "100%", ...style }}>
      <Menu open={isOpen} anchorEl={anchor} onClose={onClose}>
        <MenuList>
          {groups.map((group, i) => {
            const isLast = groups.length - 1 === i;

            const items = group.map(({ Icon, shortcut, text, action }) => (
              <MenuItem onClick={() => action?.()}>
                {Icon && (
                  <ListItemIcon>
                    <Icon fontSize="small" />
                  </ListItemIcon>
                )}
                <ListItemText>{text}</ListItemText>
                {shortcut && (
                  <Typography variant="body2" color="text.secondary">
                    {shortcut}
                  </Typography>
                )}
              </MenuItem>
            ));

            if (isLast) {
              return items;
            }

            return (
              <>
                {items}
                <Divider />
              </>
            );
          })}
        </MenuList>
      </Menu>
    </Paper>
  );
};

export default ContextMenu;
