import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../fbconfig/fbconfig";
import styles from "../design/Register.module.scss";

function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Lösenorden matchar inte.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        username: userName,
      });
      console.log("Registrering lyckades!", user);
    } catch (error) {
      setError(error.message);
      console.error("Registrering misslyckades:", error);
    }
  };

  return (
    <>
      <div className={styles.registerContainer}>
        <form onSubmit={handleRegister} className={styles.registerForm}>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Användarnamn"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Epost"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Bekräfta lösenord"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.submitBtn}>
            Registrera
          </button>
          {error && <p className={styles.errorMsg}>{error}</p>}
        </form>
      </div>
    </>
  );
}

export default Register;
