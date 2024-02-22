import { useState, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import app from "../../../../utils/FirebaseConfig";
import { AuthContext } from 'service/AuthStateProvider';

const FirebaseLogin = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [state, setState] = useState({
    open: false,
    status: true,
    message: 'Hi'
  });
  const { open, status, message } = state;

  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const {
    setIsAuthenticated,
    setToken,
    setUserRoles,
    login,
  } = useContext(AuthContext);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSignIn = async (values) => {
    const auth = getAuth(app);

    try {
      if (!app || !app.options.apiKey) {
        throw new Error("Firebase app is not initialized properly");
      }

      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      setIsAuthenticated(true);
      console.log("User signed in:", user);

      const token = await user.getIdToken();
      const userRoles = await fetchUserRoles(values.email, token);
      setUserRoles(userRoles);
      setToken(token);
      login({ user, roles: userRoles }, userRoles, token);
      console.log("User roles:", userRoles);

      return "success"
    } catch (error) {
      const err = handleSignInError(error);
      setState({ ...state, open: true, status: false, message: err })
    }
  };

  const fetchUserRoles = async (email, token) => {
    const url = new URL(`${process.env.REACT_APP_API}/users/roles`, window.location.origin);
    url.searchParams.append("email", encodeURIComponent(email));

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch user roles: ${response.statusText}`);
    }
    return response.json();
  };

  const handleSignInError = (error) => {
    console.error("User sign-in error:", error);
    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
      return ("Login failed. Please check your email and password.");
    } else {
      return ("Login failed. Please try again.");
    }
  };
  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign in with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const res = await handleSignIn(values);
            if (res === 'success') {
              navigate('/dashboard');
            }
          } catch (error) {
            console.log('error====>', error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label="Remember me"
              />
              <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                Forgot Password?
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
      <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{vertical: "bottom", horizontal: "right"}}>
        <Alert
          severity={status === true ? "success" : "error"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FirebaseLogin;
