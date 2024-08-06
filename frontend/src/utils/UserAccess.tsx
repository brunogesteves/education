import { RoleProps } from "./types";
import { jwtDecode } from "jwt-decode";

export const UserAcces: RoleProps =
  !localStorage.getItem("user") || "{}"
    ? { role: "{}" }
    : jwtDecode(localStorage.getItem("user") || "{}");
