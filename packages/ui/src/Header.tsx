import React from "react";
import { AppBar, styled, Toolbar, Typography, Grid } from "@mui/material";

interface Props extends React.PropsWithChildren {
  title: string;
  gridArea?: string;
}

interface RootProps {
  gridArea: string;
}

const Root = styled(AppBar)`
  z-index: 2;
  grid-area: ${(p: RootProps) => p.gridArea};
`;

const Header: React.FC<Props> = ({ children, title, gridArea = 'unset' }) => {
  return (
    <Root position="relative" gridArea={gridArea}>
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
