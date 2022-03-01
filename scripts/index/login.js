export function isLoggedIn() {
    const storage = window.localStorage;
    const token = storage.getItem("token");

    return token !== null;
}

export function logIn(token) {
    const storage = window.localStorage;
    storage.setItem("token", token);
}

export function logOut() {
    const storage = window.localStorage;
    storage.removeItem("token");
}