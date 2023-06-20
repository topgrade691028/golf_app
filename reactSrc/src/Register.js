import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import app from "./FirebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Import the necessary functions
import axios from "axios";
import { AuthContext } from "./AuthStateProvider";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { isAuthenticated } = useContext(AuthContext);

  const handleRegister = async () => {
    const auth = getAuth(app); // Get the auth object using getAuth()

    if (app && app.options.apiKey) {
      // App is initialized, perform actions
      // Example: Register a user
      console.log("App is initialized");

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // User registration successful
        const user = userCredential.user;
        console.log("User registered:", user);

        // Create roles for the registered user
        const roles = ["manager", "player"]; // Roles to be assigned
        const createRolesRequest = {
          email: email,
          roles: roles,
        };

        // Call the function to create roles
        await createRoles(createRolesRequest);
        console.log("Roles created");
        history.push("/dashboard");
      } catch (error) {
        // Error occurred during user registration
        console.error("User registration error:", error);
      }
    } else {
      // App is not initialized
      console.log("Firebase app is not initialized");
    }
  };

  const createRoles = async (createRolesRequest) => {
    try {
      await axios.post("/createRoles", createRolesRequest);
    } catch (error) {
      console.error("Error creating roles:", error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <Typography variant="h4" align="center" gutterBottom>
          User already logged in
        </Typography>
      ) : (
        <div>
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>
          <TextField label="Email" type="email" fullWidth margin="normal" />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegister}
            fullWidth
          >
            Register
          </Button>
        </div>
      )}
    </div>
  );
};

export default Register;
