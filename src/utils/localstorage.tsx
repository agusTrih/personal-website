export const getLocalStorageItem = (key: string) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
};

function saveMapToLocalStorage(key: string, map: any) {
  const dataString = JSON.stringify(Array.from(map.entries()));
  const encodedData = encodeURIComponent(dataString);
  const encryptedData = window.btoa(encodedData);

  localStorage.setItem(key, encryptedData);
}

function loadMapFromLocalStorage(key: string) {
  const retrievedData = getLocalStorageItem(key);
  if (!retrievedData) return new Map(); // Return empty Map if no data found

  const decryptedData = window.atob(retrievedData);
  const decodedData = decodeURIComponent(decryptedData);
  const parsedData = JSON.parse(decodedData);

  return new Map(parsedData);
}

export { saveMapToLocalStorage, loadMapFromLocalStorage };
