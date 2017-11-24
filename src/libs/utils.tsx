
// stores data using the localStorage API
export function localData (namespace, data?) {
  if (data) {
    return localStorage.setItem(namespace, JSON.stringify(data));
  }

  const item = localStorage.getItem(namespace);
  return (item && JSON.parse(item)) || null;
}

export function sessionData (namespace, data?) {
  if (data) {
    return sessionStorage.setItem(namespace, JSON.stringify(data));
  }

  const item = sessionStorage.getItem(namespace);
  return (item && JSON.parse(item)) || null;
}
