export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
  return re.test(String(email).toLowerCase()) ? "" : "Ogiltig e-postadress";
};

export const validateSamePassword = (password, confirmPassword) => {
  if (password === confirmPassword) {
    return true;
  } else {
    return false;
  }
};

export const validatePassword = (password) => {
  if (password.length < 8) {
    return "Lösenordet måste innehålla minst 8 tecken";
  }
  return "";
};

export const validatePhoneNr = (phoneNr) => {
  const re = /^\d{10}$/;
  return re.test(phoneNr)
    ? ""
    : "Ange ett giltigt telefonnummer med 10 siffror";
};

export const validateAllFields = (state) => {
  const { email, password, confirmPassword } = state;
  const errors = [];

  const emailError = validateEmail(email);
  if (emailError) errors.push(emailError);

  const samePassword = validateSamePassword(password, confirmPassword);
  if (!samePassword) errors.push("Lösenorden matchar inte");

  const passwordError = validatePassword(password);
  if (passwordError) errors.push(passwordError);

  return errors;
};
