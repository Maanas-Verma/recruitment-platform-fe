export function setUser(
  userType: "employee" | "candidate" | "hr",
  userId: string,
  department?: string
) {
  sessionStorage.setItem("user_type", userType);
  sessionStorage.setItem("department_id", department ? department : "");
  sessionStorage.setItem("user_id", userId);
}

export function getUser(): any {
  return {
    userType: sessionStorage.getItem("user_type"),
    departmentId: sessionStorage.getItem("department_id"),
    userId: sessionStorage.getItem("user_id"),
  };
}
