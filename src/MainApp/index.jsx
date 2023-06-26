import { useState } from "react";
import { HomeOutlined, DownOutlined } from "@ant-design/icons";
import {
	Layout,
	Menu,
	Typography,
	theme,
	Dropdown,
	Space,
	Row,
	Col,
} from "antd";
import Dashboard from "./pages/Dashboard";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}

const App = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const [collapsed, setCollapsed] = useState(false);

	return (
		<Layout
			style={{
				minHeight: "100vh",
			}}
		>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
			>
				<div className="demo-logo-vertical" />
				<Menu
					theme="dark"
					defaultSelectedKeys={["1"]}
					mode="inline"
					items={[getItem("Dashboard", "1", <HomeOutlined />)]}
				/>
			</Sider>
			<Layout>
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
					}}
				>
					<Row align="middle" className="px-3">
						<Col flex="1 0 auto" className="column Blue">
							<Title
								level={3}
								style={{
									margin: 0,
								}}
							>
								Dashboard
							</Title>
						</Col>
						<Col className="column">
							<Dropdown
								trigger={["click"]}
								menu={{
									items: [
										{
											label: (
												<a
													target="_blank"
													rel="noopener noreferrer"
													href="https://www.antgroup.com"
												>
													1st menu item
												</a>
											),
											key: "0",
										},
									],
								}}
							>
								<a onClick={(e) => e.preventDefault()}>
									<div className="d-flex align-items-center">
										<span>Admin</span>&nbsp;
										<DownOutlined />
									</div>
								</a>
							</Dropdown>
						</Col>
					</Row>
				</Header>
				<Content
					style={{
						margin: "0 16px",
					}}
				>
					<Dashboard />
				</Content>
				<Footer
					style={{
						textAlign: "center",
					}}
				>
					NIC Meetings ©2023
				</Footer>
			</Layout>
		</Layout>
	);
};

export default App;
