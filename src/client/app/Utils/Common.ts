export const getUser = () =>
{
    const userStr = localStorage.getItem('user');

    if(userStr) return JSON.parse(userStr);

    return null;
};

export const getToken = () =>
{
    return localStorage.getItem('token') || null;
};

export const removeUserSession = () =>
{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const setUserSession = (token: string, user: object) =>
{
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
};
