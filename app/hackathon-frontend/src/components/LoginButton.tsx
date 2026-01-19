import { useMsal } from "@azure/msal-react";
import { loginRequest, useLogin } from "../lib/auth";
import { Button } from "./ui/button";

export const LoginButton = () => {
    const { instance, accounts } = useMsal();
    const isLoggedIn = accounts.length > 0;

    if (!useLogin) {
        return null;
    }

    const handleLogin = () => {
        instance.loginPopup(loginRequest).catch(e => {
            console.error(e);
        });
    };

    const handleLogout = () => {
        instance.logoutPopup().catch(e => {
            console.error(e);
        });
    };

    return (
        <Button variant="outline" onClick={isLoggedIn ? handleLogout : handleLogin}>
            {isLoggedIn ? "Logout" : "Login"}
        </Button>
    );
};
