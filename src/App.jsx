import Login from "./Login";
import MainApp from "./MainApp";
import useLocalStorageState from "./hooks/useLocalStorageState";

function App() {
	const [authUser, setAuthUser] = useLocalStorageState("authUser", null);

	if (!authUser?.id) return <Login onLogin={setAuthUser} />;

	return <MainApp authUser={authUser} onLogout={() => setAuthUser(null)} />;
}

export default App;
