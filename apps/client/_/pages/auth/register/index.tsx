import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MLink from "@mui/material/Link";
import Link from "next/link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useStore, useStoreMap } from "effector-react";
import { hasErrors, hasEmptyFields } from "form/utils";
import { Snackbar, Alert, Grid } from "@mui/material";
import { useRouter } from "next/router";

import { AlertColor } from '@mui/material';
import { createEvent, createStore, sample } from 'effector';
import { registerFx } from 'entities';
import { createForm } from 'form';
import { filter, values } from 'form/utils';
import { createValidator } from 'form/validators';
import * as regexp from 'utils/regexp'

type Snackbar = { severity: AlertColor; message: string }

const errorMessages = {
  email: 'Must be an email',
  password: 'Must contain minimum 8 characters, 1 letter and 1 number',
  repeat_password: 'Passwords are not the same'
}

const snackbars: Record<string, Snackbar> = {
  registered: {
    severity: 'success',
    message: 'You have been successfully registered. You will be redirected to the Login Page.'
  }
}

const form = createForm({
  email: createValidator(regexp.email, errorMessages.email),
  name: createValidator(regexp.anyString, ''),
  password: createValidator(regexp.password, errorMessages.password),
  repeat_password: createValidator(regexp.password, errorMessages.password),
})

const $snackbar = createStore<Snackbar | null>(null)
const $shouldBeRedirectedToLoginPage = createStore(false)

const formSubmitted = createEvent()
const snackbarShown = createEvent<Snackbar>()
const snackbarHidden = createEvent()

sample({
  clock: formSubmitted,
  source: form.$store,
  fn: form => values(filter(form, (key) => key !== 'repeat_password')),
  target: registerFx
})

sample({
  clock: registerFx.done,
  fn: () => snackbars.registered,
  target: snackbarShown
})

sample({
  clock: registerFx.failData,
  fn: ({ message }): Snackbar => ({ severity: 'error', message: message }),
  target: snackbarShown
})

sample({
  clock: snackbarHidden,
  source: $snackbar,
  filter: snackbar => snackbar === snackbars.registered,
  fn: () => true,
  target: $shouldBeRedirectedToLoginPage
})

sample({
  clock: snackbarShown,
  target: $snackbar
})

sample({
  clock: snackbarHidden,
  fn: () => null,
  target: $snackbar
})

sample({
  clock: form.$store,
  filter: ({ repeat_password, password }) => repeat_password.error !== errorMessages.repeat_password && password.value !== repeat_password.value,
  fn: (form) => ({
    ...form,
    repeat_password: { value: form.repeat_password.value, error: errorMessages.repeat_password }
  }),
  target: form.$store
})


function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 8, mb: 4 }}
    >
      {"Copyright © "}
      <MLink variant="body2" component="span">
        <Link href="https://konnakol.studio">konnakol.studio</Link>
      </MLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const RegisterPage = () => {
  const { email, name, password, repeat_password } = useStore(form.$store);
  const shouldBeRedirectedToLoginPage = useStore(
    $shouldBeRedirectedToLoginPage
  );
  const snackbar = useStore($snackbar);
  const isButtonDisabled = useStoreMap(
    form.$store,
    (form) => hasEmptyFields(form) || hasErrors(form)
  );

  const router = useRouter();

  if (shouldBeRedirectedToLoginPage) {
    router.push("auth/login");
    return null;
  }

  return (
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
          Register in Konnakol Studio
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
            label="Your name"
            name="name"
            value={name.value}
            error={!!name.error}
            helperText={name.error}
            onChange={(e) => form.update({ name: e.target.value })}
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="repeat_password"
            label="Repeat password"
            type="password"
            value={repeat_password.value}
            error={!!repeat_password.error}
            helperText={repeat_password.error}
            onChange={(e) => form.update({ repeat_password: e.target.value })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isButtonDisabled}
          >
            Register
          </Button>
          <Grid container>
            <Grid item>
              <MLink variant="body2" component="span">
                <Link href="/auth/login">Already have an account? Login.</Link>
              </MLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright />
      <Snackbar
        open={!!snackbar}
        autoHideDuration={4000}
        onClose={() => snackbarHidden()}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Alert
          onClose={() => snackbarHidden()}
          severity={snackbar?.severity}
          sx={{ width: "100%" }}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegisterPage;
