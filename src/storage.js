// src/storage.js  – קובץ עזר בלבד

export function getUserNamespace(user) {
  const raw = localStorage.getItem("rted_users");
  const store = raw ? JSON.parse(raw) : {};
  if (!store[user]) store[user] = {};
  return store;
}
export function saveUserNamespace(store) {
  localStorage.setItem("rted_users", JSON.stringify(store));
}

export function listFiles(user) {
  return Object.keys(getUserNamespace(user)[user]);
}

export function saveFile(user, name, content) {
  const s = getUserNamespace(user);
  s[user][name] = content;
  saveUserNamespace(s);
}

export function loadFile(user, name) {
  return getUserNamespace(user)[user][name] || "";
}
