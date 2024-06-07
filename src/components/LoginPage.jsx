import React, { useState } from "react";
import styles from "../design/LoginPage.module.scss";

function LoginPage() {
  function logIn() {
    setisAuthenticated(true);
    console.log("foo");
  }

  return (
    <>
      <div className={styles.loginContainer}>
        <form className={styles.loginForm}>
          <input
            type="text"
            name="userName"
            id="userName"
            className={styles.input}
            placeholder="Användarnamn"
          />
          <input
            type="password"
            name="password"
            id="password"
            className={styles.input}
            placeholder="Lösenord"
          />
          <button onClick={logIn} type="submit" className={styles.submitBtn}>
            Logga in
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
