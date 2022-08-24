import { randomBytes, scryptSync } from "crypto";

const encryptPassword = (password: string, salt: string) => {
  return scryptSync(password, salt, 32).toString("hex");
};

export const hashPassword = (password: string): string => {
  // Any random string here (ideally should be atleast 16 bytes)
  const salt = randomBytes(16).toString("hex");
  console.log(salt);
  return encryptPassword(password, salt) + salt;
};

export const matchPassword = (
  password: string,
  hash: string | null
): Boolean => {
  // hash can be null if the user is not existed
  if (!!hash) {
    // extract salt from the hashed string
    // our hex password length is 32*2 = 64
    const salt = hash.slice(64);
    const originalPassHash = hash.slice(0, 64);
    const currentPassHash = encryptPassword(password, salt);
    return originalPassHash === currentPassHash;
  }
  return false;
};
