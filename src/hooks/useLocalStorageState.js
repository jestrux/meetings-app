import { useState } from "react";
export const STORE_KEY = "NIC-MEETINGS-APP-DATA";

export function getValueFromLocalStorage(key, defaultValue = null) {
	let store = window.localStorage.getItem(STORE_KEY);
	if (store) {
		store = JSON.parse(store);
		if (!key) return store;

		const value = store[key];
		return value ? value : defaultValue;
	}

	return defaultValue;
}

export function saveValueToLocalStorage(key, value) {
	const store = getValueFromLocalStorage(null, {});
	store[key] = value;
	window.localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

// Borrowed from https://usehooks.com/useLocalStorage/
function useLocalStorageState(key, initialValue) {
	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState(() => {
		if (key == undefined || key == null) return initialValue;

		try {
			return getValueFromLocalStorage(key, initialValue);
		} catch (error) {
			// If error also return initialValue
			console.log(error);
			return initialValue;
		}
	});
	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = (value) => {
		try {
			// Allow value to be a function so we have same API as useState
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			// Save state
			setStoredValue(valueToStore);

			if (key == undefined || key == null) return;
			// Save to local storage
			saveValueToLocalStorage(key, valueToStore);
		} catch (error) {
			// A more advanced implementation would handle the error case
			console.log(error);
		}
	};

	return [storedValue, setValue];
}

export default useLocalStorageState;
