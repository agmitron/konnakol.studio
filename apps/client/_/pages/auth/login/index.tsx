import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MLink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useStore, useStoreMap } from "effector-react";
import Link from "next/link";
import { hasErrors, hasEmptyFields } from "form/utils";

import { createEvent, sample } from "effector";
import { loginFx } from "entities";
import { createForm } from "form";
import { values } from "form/utils";
import { createValidator } from "form/validators";
import * as regexp from "utils/regexp";

const form = createForm({
  email: createValidator(regexp.anyString, ""),
  password: createValidator(regexp.anyString, ""),
});

const formSubmitted = createEvent();

sample({
  clock: formSubmitted,
  source: form.$store,
  fn: (form) => values(form),
  target: loginFx,
});

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 8, mb: 4 }}
    >
      {"Copyright © "}
      <MLink color="inherit" component="span">
        <Link href={{ pathname: "https://konnakol.studio" }} target="_blank">
          konnakol.studio
        </Link>
      </MLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const LoginPage = () => {
  const { email, password } = useStore(form.$store);
  const isButtonDisabled = useStoreMap(
    form.$store,
    (form) => hasEmptyFields(form) || hasErrors(form)
  );

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login in Konnakol Studio
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              formSubmitted();
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoFocus
              value={email.value}
              error={!!email.error}
              helperText={email.error}
              onChange={(e) => form.update({ email: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password.value}
              error={!!password.error}
              helperText={password.error}
              onChange={(e) => form.update({ password: e.target.value })}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isButtonDisabled}
            >
              Login
            </Button>
            <Grid container>
              {/* <Grid item xs>
                TODO
                <MLink href="#" variant="body2">
                  Forgot password?
                </MLink>
              </Grid> */}
              <Grid item>
                <MLink variant="body2" component="span">
                  <Link href="/auth/register">
                    Don&apos;t have an account? Register
                  </Link>
                </MLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
