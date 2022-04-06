// Check if there is a token in local storage.
export function isLoggedIn() {
    const storage = window.localStorage;
    const token = storage.getItem("token");

    return token !== null;
}

// Get token from local storage.
export function getID() {
    const storage = window.localStorage;
    const token = storage.getItem("token");

    return token;
}

// Store the user token in local storage.
export async function logIn(token) {
    const storage = window.localStorage;
    storage.setItem("token", token);
}

// Delete token from local storage.
export function logOut() {
    const storage = window.localStorage;
    storage.removeItem("token");
}