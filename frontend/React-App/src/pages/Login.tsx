import React, { useState, useContext } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUser } from "../api/users";
import { AuthContext } from "../contexts/AuthContext";

import Button from "react-bootstrap/Button";

export function Login() {
    const [errorMessage, setError] = useState<string>();
    const [popupOpen, setPopupOpen] = useState(false);


    const provider = new GoogleAuthProvider();
    provider.addScope("email");
    provider.addScope("profile");
  
    const navigate = useNavigate();
    const login = () => {
        signInWithPopup(auth, provider)
          .then((result) => {
            const user = result.user;
    
            const names = user.displayName?.split(" ") ?? ["", ""];
            const firstName = names[0];
            const lastName = names[1];
    
            const email = user.email ?? "";
    
            void createUser({ email, firstName, lastName }).then(() => {
              navigate("/");
            });
          })
          .catch((error: FirebaseError) => {
            console.log(error);
            if (error.code === "auth/internal-error" && error.message.includes("Cloud Function")) {
              setError("You are not authorized to sign in.");
            }
          });
        }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', rowGap: '15em' }}>
            <h1 style={{ fontSize: '10em', color: 'green'}}>FitFuel</h1>
            <Button variant="primary" onClick={login} disabled={popupOpen}>Sign in with Google</Button>
        </div>
    );
}
