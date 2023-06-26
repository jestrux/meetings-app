import { Breadcrumb, theme, Row, Col } from "antd";
import Attendees from "./Attendees";

const NewMeeting = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<>
			<Breadcrumb
				style={{
					margin: "16px 0",
				}}
				items={[{ title: "App" }, { title: "New Meeting" }]}
			/>

			<div
				style={{
					padding: 24,
					minHeight: 360,
					background: colorBgContainer,
				}}
			>
				<Row>
					<Col className="border rounded-lg" span={12}>
						<Attendees />
					</Col>
					<Col></Col>
				</Row>
			</div>
		</>
	);
};

export default NewMeeting;
