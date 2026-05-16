import { BASE_URL } from "./config";


export const fetchAllUsers = async (token) => {
  const res = await fetch(`${BASE_URL}/auth/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data.data || [];
};
