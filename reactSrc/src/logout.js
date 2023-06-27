import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./AuthStateProvider";
import { makeStyles } from "@material-ui/core/styles";
import { Container, CircularProgress, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  text: {
    marginTop: theme.spacing(2),
    textAlign: "center",
  },
}));

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    logout();
    history.replace("/"); // Redirect to the homepage after logout
  }, [logout, history]);

  return (
    <Container className={classes.container}>
      <div>
        <CircularProgress />
        <Typography variant="h5" className={classes.text}>
          Logging out...
        </Typography>
      </div>
    </Container>
  );
};

export default Logout;
