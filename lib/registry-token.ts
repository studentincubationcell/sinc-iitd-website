import { randomBytes } from "node:crypto";

export function newManageToken(): string {
  return randomBytes(18).toString("base64url");
}
