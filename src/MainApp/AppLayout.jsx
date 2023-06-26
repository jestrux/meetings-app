import { useState } from "react";
import {
	HomeOutlined,
	CalendarOutlined,
	DownOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Typography, theme, Dropdown, Row, Col } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

function getItem(label, icon, children) {
	return {
		key: label,
		icon,
		children,
		label,
	};
}

const AppLayout = ({ children, onChangePage, currentPage }) => {
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
				theme="light"
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
			>
				<div className="demo-logo-vertical" />
				<Menu
					// theme="dark"
					onClick={onChangePage}
					defaultSelectedKeys={[currentPage]}
					mode="inline"
					items={[
						getItem("Dashboard", <HomeOutlined />),
						getItem("New Meeting", <CalendarOutlined />),
					]}
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
								{currentPage}
							</Title>
						</Col>
						<Col className="column">
							<Dropdown
								trigger={["click"]}
								menu={{
									items: [
										{
											label: <a href="#">Logout</a>,
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
					{children}
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

export default AppLayout;
