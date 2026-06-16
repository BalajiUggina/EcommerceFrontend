// centrailizer object for local storage operations related to authentication tokens
export const storage = {
    
    getAccessToken() {
        return localStorage.getItem("access_token");
    },

    getRefreshToken() {
        return localStorage.getItem("refresh_token");
    },

    setTokens(access: string, refresh: string) {
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
    },

    clearTokens() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
    },
};