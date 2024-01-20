export function setUser(
  userType: "employee" | "candidate" | "hr",
  userId: string,
  department?: string,
  userName?: string
) {
  sessionStorage.setItem("user_type", userType);
  sessionStorage.setItem("department", department ? department : "");
  sessionStorage.setItem("user_id", userId);
  sessionStorage.setItem("user_name", userName ? userName : "");
}

export function getUser(): any {
  return {
    userType: sessionStorage.getItem("user_type"),
    department: sessionStorage.getItem("department"),
    userId: sessionStorage.getItem("user_id"),
    userName: sessionStorage.getItem("user_name"),
  };
}
