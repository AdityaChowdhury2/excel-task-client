//set token in local storage
export const setToken = (token) => {
    localStorage.setItem('token', JSON.stringify(`Bearer ${token}`));
};
//get token from local storage
export const getToken = () => {
    return JSON.parse(localStorage.getItem('token'));
}
//remove token from local storage
export const removeToken = () => {
    localStorage.removeItem('token');
}