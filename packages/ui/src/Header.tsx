import React from "react";
import { AppBar, styled, Toolbar, Typography, Grid } from "@mui/material";

interface Props extends React.PropsWithChildren {
  title: string;
  className?: string;
}

const Root = styled(AppBar)`
  z-index: 2;
`;

const Header: React.FC<Props> = ({ children, title, className }) => {
  return (
    <Root position="relative" className={className}>
      <Toolbar>
        <Grid container spacing={2}>
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
