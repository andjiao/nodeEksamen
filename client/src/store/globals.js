import { readable, writable } from "svelte/store";

let localData = localStorage.getItem("global_user")
export const global_user = writable(localData ? JSON.parse(localData) : null);

export function saveUser(global_user) {
    localStorage.setItem("global_user", JSON.stringify(global_user))
}

export const BASE_URL = readable('http://localhost:8080/api')




