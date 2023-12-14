import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Button, TextField } from "@mui/material";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Atualize o perfil do usuário com nome e sobrenome
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      // Faça algo com o usuário, redirecione, etc.
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="login flex flex-col w-80 gap-2 mt-4 ">
      <TextField
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <TextField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button onClick={handleSignup} variant="contained" className="button">
        Sign Up
      </Button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;
