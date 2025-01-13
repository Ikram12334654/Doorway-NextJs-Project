import io from "socket.io-client";
import env from "./config";

export const SOCKET = io(env.API_URL.split("/api")[0]);
