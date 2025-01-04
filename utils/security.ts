const CryptoJS = require("crypto-js");

const secretKey =
  "b3K8zD1g5LpQ7sX0YwUqJfM9nJLpQ7sX0YwUK8zD1g5LpQ7sX0YwUqJfM9nJLpQ7sX0";

export function decryptJSON(encryptedData: any) {
  const [salt, encrypted] = encryptedData?.split(":");
  const key = CryptoJS?.PBKDF2(secretKey, CryptoJS?.enc?.Base64?.parse(salt), {
    keySize: 256 / 32,
    iterations: 1000,
  });
  const bytes = CryptoJS?.AES?.decrypt(encrypted, key?.toString());
  const decrypted = bytes?.toString(CryptoJS?.enc?.Utf8);

  try {
    return JSON?.parse(decrypted);
  } catch (error) {
    return null;
  }
}
