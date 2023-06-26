import Login from "./Login";
import MainApp from "./MainApp";
import useLocalStorageState from "./hooks/useLocalStorageState";
import { AuthContext } from "./providers/auth";

function App() {
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
			{!authUser?.id ? <Login /> : <MainApp />}
		</AuthContext.Provider>
	);
}

export default App;
