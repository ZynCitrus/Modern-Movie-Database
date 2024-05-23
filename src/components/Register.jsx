import React from "react";
/* import "../design/Register.scss"; */

function Register() {
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

export default Register;
