export default function getCurrentUser() {
    const userFromLocalStorage = localStorage.getItem('user');
    const currentUser: UserInfo = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;
    return currentUser;
}