import { useEffect, useState } from "react";
import {
	Avatar,
	List,
	Skeleton,
	Space,
	Divider,
	Input,
	Typography,
} from "antd";
const { Title } = Typography;
const { Search } = Input;

const fakeDataUrl = `https://randomuser.me/api/?results=3&inc=name,email,picture&noinfo`;

const Attendees = () => {
	const [loading, setLoading] = useState(true);
	const [list, setList] = useState([]);
	useEffect(() => {
		fetch(fakeDataUrl)
			.then((res) => res.json())
			.then((res) => {
				setLoading(false);
				setList(res.results);
			});
	}, []);

	return (
		<div>
			<div className="pt-4 px-4">
				<Title level={4}>Meeting attendees</Title>
				<List
					loading={loading}
					itemLayout="horizontal"
					dataSource={list}
					renderItem={(item) => (
						<List.Item>
							<Skeleton
								avatar
								title={false}
								loading={item.loading}
								active
							>
								<List.Item.Meta
									avatar={<Avatar src={item.picture.large} />}
									title={
										<a href="https://ant.design">
											{item.name?.first} {item.name?.last}
										</a>
									}
									description={item.email}
								/>
								{/* <div>content</div> */}
							</Skeleton>
						</List.Item>
					)}
				/>
			</div>

			<Divider />

			<div className="pb-3 px-3">
				<Title level={4}>New attendee</Title>

				<Space.Compact style={{ width: "100%" }}>
					<Search
						placeholder="Enter attendee name"
						size="large"
						enterButton="Add"
						loading
					/>
				</Space.Compact>
			</div>
		</div>
	);
};
export default Attendees;
