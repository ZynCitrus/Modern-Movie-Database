import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/context/AuthContext";
import { auth, db } from "../fbconfig/fbconfig";
import styles from "../design/LoginPage.module.scss";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  async function logIn() {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Inloggning lyckades, användare:", user);

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("Användaruppgifter från Firestore:", userData);

        const userWithUsername = { ...user, username: userData.username };
        setUser(userWithUsername);
        localStorage.setItem("user", JSON.stringify(userWithUsername));
        navigate("/profile");
      } else {
        console.error(
          "Användaruppgifter saknas i databasen för UID:",
          user.uid
        );
        setError("Användaruppgifter saknas i databasen");
      }
    } catch (error) {
      setError(error.message);
      console.error("Inloggning misslyckades:", error);
    }
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
