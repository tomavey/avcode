const drawerItems = [
  { name: "Users", path: "/users", rights: "admin", sortOrder: 5 },
  { name: "About", path: "/about", rights: "admin", sortOrder: 6 },
  { name: "Signup", path: "/signup", rights: "admin", sortOrder: 6 },
  { name: "Login", action: "login", rights: "admin", sortOrder: 6 },
  { name: "Logout", action: "logout", rights: "admin", sortOrder: 6 },
];

export const useDrawerItems = () => {
  return { drawerItems };
};
