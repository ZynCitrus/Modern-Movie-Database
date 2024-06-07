import React from "react";
import styles from "../design/Register.module.scss";

function Register() {
  return (
    <>
      <div className={styles.registerContainer}>
        <form action="submit" className={styles.registerForm}>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Användarnamn"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Lösenord"
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Bekräfta lösenord"
          />
          <button type="submit" className={styles.submitBtn}>
            Logga in
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
