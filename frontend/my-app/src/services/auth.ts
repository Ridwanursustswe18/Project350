export default function authHeader() {
  const userString = localStorage.getItem("token");
  console.log(userString);
  if (userString) {
    return { Authorization: `Bearer ${userString}` };
  }
}
