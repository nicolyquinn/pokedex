import { useAppDispatch } from "../app/hooks";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth, firebaseDB, usersRef } from "@/utils/FirebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { setUserStatus } from "../app/slices/AppSlice";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import GoogleIcon from "@mui/icons-material/Google";

function Login() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const {
        user: { uid },
      } = await signInWithPopup(firebaseAuth, provider);
      handleUser(uid, email);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginWithEmailAndPassword = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      handleUser(user.uid, email);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUser = async (uid: string, email: string) => {
    if (email) {
      const firestoreQuery = query(usersRef, where("uid", "==", uid));
      const fetchedUser = await getDocs(firestoreQuery);

      if (fetchedUser.docs.length === 0) {
        await addDoc(collection(firebaseDB, "users"), {
          uid,
          email,
        });
      }
      dispatch(setUserStatus({ email }));
    }
  };

  return (
    <div className="login flex flex-col w-80 gap-2 mt-4 ">
      <Button
        onClick={handleLoginWithGoogle}
        variant="contained"
        className="button"
      >
        <GoogleIcon />
        Login with Google
      </Button>
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
      <Button
        onClick={handleLoginWithEmailAndPassword}
        variant="contained"
        className="button"
      >
        Login
      </Button>
    </div>
  );
}

export default Login;
