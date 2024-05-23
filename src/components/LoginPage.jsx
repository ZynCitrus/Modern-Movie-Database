import React from "react";
import "../design/LoginPage.scss";

function LoginPage() {
  return (
    <>
      <div>
        <form action="submit">
          <input type="text" name="userName" id="userName" />
          <input type="password" name="password" id="password" />
          <button type="submit" className="submitBtn">
            Logga in
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
