const drawerItems = [
  { name: "Prayer Requests", path: "/", sortOrder: 1 },
  { name: "Notes", path: "/about", sortOrder: 1.5 },
  { name: "Moderators", path: "/moderators", rights: "moderate,admin", sortOrder: 2 },
  { name: "Undelete Requests", path: "/deleted", rights: "admin", sortOrder: 4 },
  { name: "Users", path: "/users", rights: "admin", sortOrder: 5 },
  { name: "Account", path: "/account", rights: "admin", sortOrder: 6 },
  { name: "Logout", action: "logout", sortOrder: 7 },
  { name: "Login", action: "openLoginDialog", sortOrder: 8 },
  { name: "Settings", path: "/settings", rights: "admin", sortOrder: 9 },
  { name: "Toggle Theme", action: "toggleTheme", rights: "admin", sortOrder: 10 },
  { name: "Hard Delete", action: "deleteOldSoftDeletedRecords", rights: "admin", sortOrder: 11 }
];

export const useDrawerItems = () => {

  return { drawerItems }

}
