import React from "react";
import { AppBar, Grid, styled, Toolbar, Typography } from "@mui/material";

interface Props extends React.PropsWithChildren {
  title: string;
}

const Root = styled(AppBar)`
  z-index: 1;
`;

const Header: React.FC<Props> = ({ children, title }) => {
  return (
    <Root position="relative">
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
