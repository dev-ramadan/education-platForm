/**
 * useAuth — الوصول لبيانات المستخدم والـ token من localStorage
 */
export function useAuth() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = !!token;

  const logout = () => {
    localStorage.clear();
  };

  return { token, user, isLoggedIn, logout };
}
