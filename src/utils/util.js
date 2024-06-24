export const roles = {
  EMPLOYEE: "employee",
  ADMIN: "admin",
};



export const permissions = {
  adminAccess: {
    routes: ["/contact", "/contact/:id"],
    allowedRoles: [roles.ADMIN],
  },
  employeeAccess: {
    routes: ["/scratch", "/chat"],
    allowedRoles: [roles.EMPLOYEE],
  },
};
