import React from "react";
import { AppBar, styled, Toolbar, Typography } from "@mui/material";

interface Props extends React.PropsWithChildren {
  title: string;
}

const Header = styled(AppBar)`
  z-index: 1
`

const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Header position="relative">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </Header>
      {children}
    </>
  );
};

export default Layout;
