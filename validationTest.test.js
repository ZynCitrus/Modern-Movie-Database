import {
  validateEmail,
  validateSamePassword,
  validatePassword,
  validatePhoneNr,
  validateAllFields,
} from "./src/context/validation/RegisterValidation";

describe("validateEmail", () => {
  it("should return empty string for a valid email address", () => {
    expect(validateEmail("test@example.com")).toBe("");
  });

  it("should return error message for an invalid email address", () => {
    expect(validateEmail("invalidemail")).toBe("Ogiltig e-postadress");
  });
});

describe("validateSamePassword", () => {
  it("should return true for matching passwords", () => {
    expect(validateSamePassword("password", "password")).toBe(true);
  });

  it("should return false for non-matching passwords", () => {
    expect(validateSamePassword("password1", "password2")).toBe(false);
  });
});

describe("validatePassword", () => {
  it("should return empty string for a password with at least 8 characters", () => {
    expect(validatePassword("password123")).toBe("");
  });

  it("should return error message for a password with less than 8 characters", () => {
    expect(validatePassword("pass")).toBe(
      "Lösenordet måste innehålla minst 8 tecken"
    );
  });
});

describe("validatePhoneNr", () => {
  it("should return empty string for a valid phone number", () => {
    expect(validatePhoneNr("1234567890")).toBe("");
  });

  it("should return error message for an invalid phone number", () => {
    expect(validatePhoneNr("123")).toBe(
      "Ange ett giltigt telefonnummer med 10 siffror"
    );
  });
});
describe("validateAllFields", () => {
  it("should return an array of error messages for invalid fields", () => {
    const state = {
      email: "invalidemail",
      password: "password",
      confirmPassword: "password1",
    };
    expect(validateAllFields(state)).toEqual([
      "Ogiltig e-postadress",
      "Lösenorden matchar inte",
    ]);
  });

  it("should return an empty array for valid fields", () => {
    const state = {
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
    };
    expect(validateAllFields(state)).toHaveLength(0);
  });
});
