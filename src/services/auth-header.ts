import currentUser from "./user-info";

export default function authHeader() {
  if (currentUser() && currentUser().token) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${currentUser().token}`
    };
  } else {
    return {};
  }
}
  