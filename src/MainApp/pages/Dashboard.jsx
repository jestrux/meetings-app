import { Breadcrumb, theme } from "antd";

const Dashboard = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<>
			<Breadcrumb
				style={{
					margin: "16px 0",
				}}
				items={[{ title: "User" }, { title: "Bill" }]}
			/>

			<div
				style={{
					padding: 24,
					minHeight: 360,
					background: colorBgContainer,
				}}
			>
				Bill is a cat.
			</div>
		</>
	);
};

export default Dashboard;
