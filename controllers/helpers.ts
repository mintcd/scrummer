import { stringify } from "querystring";

export function generateCookie(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let cookie = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    cookie += characters.charAt(randomIndex);
  }

  return cookie;
}

export function isEmail(string: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(string);
}

export function containsSpecialCharacters(username: string) {
  const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
  return specialCharsRegex.test(username);
}