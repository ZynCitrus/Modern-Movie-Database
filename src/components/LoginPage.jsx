import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../context/context/AuthContext.jsx"; // Se till att denna sökväg stämmer överens med din filstruktur
import { auth } from "../fbconfig/fbconfig";
import styles from "../design/LoginPage.module.scss";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  function logIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Inloggning lyckades
        setUser(userCredential.user);
        console.log("Inloggning lyckades!", userCredential.user);
        navigate("/");
      })
      .catch((error) => {
        // Inloggning misslyckades
        setError(error.message);
        console.error("Inloggning misslyckades:", error);
      });
  }

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          placeholder="E-post"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          placeholder="Lösenord"
        />
        <button type="button" onClick={logIn} className={styles.submitBtn}>
          Logga in
        </button>
        {error && <p className={styles.errorMsg}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginPage;
