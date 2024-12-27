import { jwtDecode } from 'jwt-decode';

const isValidToken = (accessToken: string) => {
    if (!accessToken) {
        return false;
    }
    const decoded = jwtDecode<{ exp: number }>(accessToken);
    
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
};

const handleTokenExpired = (exp: number) => {
    let expiredTimer;

    const currentTime = Date.now();

    // Test token expires after 10s
    // const timeLeft = currentTime + 10000 - currentTime; // ~10s
    const timeLeft = exp * 1000 - currentTime;

    clearTimeout(expiredTimer);

    expiredTimer = setTimeout(() => {
        localStorage.removeItem('accessToken');

        window.location.href = '/login';
    }, timeLeft);
};

const setSession = (accessToken: string | null) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken);

        // This function below will handle when token is expired
        const { exp } = jwtDecode<{ exp: number }>(accessToken); 
        handleTokenExpired(exp);
    } else {
        localStorage.removeItem('accessToken');
    }
};

export { isValidToken, setSession };