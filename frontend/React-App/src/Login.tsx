import React, { useState } from "react";
import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleProvider } from "./firebase";
import Button from "react-bootstrap/Button";

const auth = getAuth();

function Login() {
    const [popupOpen, setPopupOpen] = useState(false);

    const handleOnClick = () => {
        setPopupOpen(true);
        signInWithPopup(auth, GoogleProvider).finally(() => setPopupOpen(false));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', rowGap: '15em' }}>
            <h1 style={{ fontSize: '10em', color: 'green'}}>FitFuel</h1>
            <Button variant="primary" onClick={handleOnClick} disabled={popupOpen}>Sign in with Google</Button>
        </div>
    );
}

export default Login;
