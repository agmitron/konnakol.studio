import React from "react";
import { AppBar, Grid, styled, Toolbar, Typography } from "@mui/material";

interface Props extends React.PropsWithChildren {
  title: string;
  area?: string;
}

const Root = styled(AppBar)`
  z-index: 1;
  grid-area: ${(p: Pick<Props, "area">) => p.area ?? "unset"};
`;

const Header: React.FC<Props> = ({ children, title, area }) => {
  return (
    <Root position="relative" area={area}>
      <Toolbar>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
          </Grid>
          <Grid item>{children}</Grid>
        </Grid>
      </Toolbar>
    </Root>
  );
};

export default Header;
