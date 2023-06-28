import useLocalStorageState from "../../hooks/useLocalStorageState";
import { AuthContext } from "./index";

export default function AuthProvider({ children }) {
	const [authUser, setAuthUser] = useLocalStorageState("authUser", null);
	const authContextValues = {
		authUser,
		login(user) {
			setAuthUser(user);
		},
		logout() {
			setAuthUser(null);
		},
	};

	return (
		<AuthContext.Provider value={authContextValues}>
			{children}
		</AuthContext.Provider>
	);
}
