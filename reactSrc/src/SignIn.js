import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Button,
  Paper,
  TextField,
  Typography,
  Grid,
  IconButton,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { AccountCircle, LockOutlined, ArrowForward } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import app from "./FirebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "./AuthStateProvider";
import { apiUrl } from "./config";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    maxWidth: 400,
    margin: "0 auto",
  },
  icon: {
    fontSize: 60,
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  link: {
    display: "block",
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const history = useHistory();

  const {
    isAuthenticated,
    setIsAuthenticated,
    token,
    setToken,
    userRoles,
    setUserRoles,
    login,
  } = useContext(AuthContext);

  const handleSignIn = async () => {
    const auth = getAuth(app);

    if (app && app.options.apiKey) {
      // App is initialized, perform actions
      console.log("App is initialized");
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        // User sign-in successful
        const user = userCredential.user;
        setIsAuthenticated(true);
        console.log("User signed in:", user);
        const url = new URL(`${apiUrl}/users/roles`, window.location.origin);
        url.searchParams.append("email", encodeURIComponent(email));

        // Call backend API to get user roles
        const token = await user.getIdToken();

        //const token = "12345token";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userRoles = await response.json();
          // Handle user roles data
          console.log("User roles:", userRoles);
          // login({ ...user, roles: userRoles });
          setUserRoles(userRoles);
          console.log("token");
          setToken(token);
          //login({ user, roles: userRoles }, userRoles, token);
          login({ user, roles: userRoles }, userRoles, token);
        } else {
          // Error occurred while fetching user roles
          console.error("Failed to fetch user roles:", response.statusText);
        }

        history.push("/");
      } catch (error) {
        // Error occurred during user sign-in
        console.error("User sign-in error:", error);
        if (error.code === "auth/user-not-found") {
          setLoginError("Login failed. Please check your email and password.");
        } else {
          setLoginError("Login failed. Please try again.");
        }
      }
    } else {
      // App is not initialized
      console.log("Firebase app is not initialized");
    }
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h4" align="center" gutterBottom>
            <AccountCircle className={classes.icon} />
            Sign In
          </Typography>
          {loginError && (
            <Alert severity="error" variant="filled">
              {loginError}
            </Alert>
          )}
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignIn}
            fullWidth
            className={classes.button}
            endIcon={<ArrowForward />}
          >
            Sign In
          </Button>
          <Link to="/register" className={classes.link}>
            Create an account
          </Link>
          <Link to="/forgot-password" className={classes.link}>
            Forgot password?
          </Link>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignIn;
