import Login from "./Login";

import AuthProvider from "./providers/auth/provider";
import { AuthContext } from "./providers/auth";
import AppProvider from "./providers/app/provider";
import AppRouter from "./AppRouter";

export default function App() {
	return (
		<AuthProvider>
			<AppProvider>
				<AuthContext.Consumer>
					{({ authUser }) =>
						!authUser?.id ? <Login /> : <AppRouter />
					}
				</AuthContext.Consumer>
			</AppProvider>
		</AuthProvider>
	);
}
