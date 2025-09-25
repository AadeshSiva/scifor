export const getAccessToken = () =>
  sessionStorage.getItem("access_token") ||
  localStorage.getItem("access_token");

export const isAuthenticated = () => !!getAccessToken();

export const authHeaders = () => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export async function getUserStatus() {
  const token = getAccessToken();
  if (!token)
    return {
      authenticated: false,
      isGuest: false,
      isMember: false,
      name: "",
      email: "",
    };

  try {
    const res = await fetch(
      "https://intern-project-final-1.onrender.com/confirm-payment",
      {
        headers: { ...authHeaders() },
        credentials: "include",
      },
    );

    if (!res.ok)
      return {
        authenticated: true,
        isGuest: false,
        isMember: false,
        name: "",
        email: "",
      };

    const data = await res.json();
    const isMember = !!data?.user_paid || data?.status === "paid";
    const isGuest = !isMember && (!!data?.name || !!data?.email);
    return {
      authenticated: true,
      isGuest,
      isMember,
      name: data?.name || "",
      email: data?.email || "",
    };
  } catch {
    return {
      authenticated: true,
      isGuest: false,
      isMember: false,
      name: "",
      email: "",
    };
  }
}
