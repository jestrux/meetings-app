import { useState } from "react";
import { Button } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import useAPI from "./hooks/useAPI";
import { saveValueToLocalStorage } from "./hooks/useLocalStorageState";

function formDataObject(form) {
	return Array.from(new FormData(form)).reduce(
		(agg, [key, value]) => ({
			...agg,
			[key]: value,
		}),
		{}
	);
}

const Login = () => {
	const [login, { loading: authenticating }] = useAPI("/login");
	const [showPassword, setShowPassword] = useState(null);
	const [message, setMessage] = useState(null);

	const handleLogin = async (e) => {
		e.preventDefault();
		const form = e.target;

		setMessage(null);

		const res = await login(formDataObject(form));

		if (res?.id) {
			setMessage({
				type: "success",
				content: "We'll get back to you soon.",
			});

			form.reset();

			saveValueToLocalStorage("authUser", res);
		} else {
			setMessage({
				type: "error",
				content: "Whoops! Wrong credentials!",
			});
		}
	};

	return (
		<div
			className="vh-100 vw-100 d-flex align-items-center justify-content-center"
			style={{ backgroundColor: "#f5f5f5" }}
		>
			<main className="bg-white shadow-sm w-75 rounded-lg row overflow-hidden">
				<div className="col-6 border p-0 position-relative">
					<img
						className="position-absolute w-100 h-100"
						src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDF8fGZhbmN5JTIwaG91c2V8ZW58MHx8fHwxNjg3NDEzNTg3fDA&ixlib=rb-4.0.3&q=80&w=1080"
						alt=""
						style={{ objectFit: "cover" }}
					/>
				</div>

				<div
					className="col"
					style={{ paddingTop: "3.5rem", paddingBottom: "4rem" }}
				>
					<div className="p-5">
						<h3 className="mb-3">Sign in to NIC Meetings</h3>

						{message && (
							<div
								id="alertMessage"
								className={`alert ${
									message.type == "success"
										? "alert-success"
										: "alert-danger"
								} alert-dismissible fade show`}
								role="alert"
							>
								<strong className="text-capitalize">
									{message.type}!
								</strong>
								{message.content}
								<button
									type="button"
									className="close"
									data-dismiss="alert"
									aria-label="Close"
									onClick={() => setMessage(null)}
								>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
						)}

						<form onSubmit={handleLogin}>
							<div className="form-group">
								<label htmlFor="exampleInputEmail1">
									Email address
								</label>
								<input
									type="email"
									className="form-control form-control-lg"
									id="exampleInputEmail1"
									name="email"
									aria-describedby="emailHelp"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="exampleInputPassword1">
									Password
								</label>

								<div className="position-relative">
									<input
										type={
											showPassword ? "text" : "password"
										}
										className="form-control form-control-lg"
										name="password"
										id="exampleInputPassword1"
									/>

									<Button
										className="position-absolute"
										type="text"
										icon={
											!showPassword ? (
												<EyeOutlined
													size="sm"
													style={{
														verticalAlign: 0,
													}}
												/>
											) : (
												<EyeInvisibleOutlined
													size="sm"
													style={{
														verticalAlign: 0,
													}}
												/>
											)
										}
										size="sm"
										shape="circle"
										style={{
											right: "0.35rem",
											top: 0,
											bottom: 0,
											margin: "auto",
										}}
										onClick={() =>
											setShowPassword(!showPassword)
										}
									/>
								</div>
							</div>
							<div className="form-group form-check form-check-lg">
								<input
									type="checkbox"
									className="form-check-input"
									id="exampleCheck1"
								/>
								<label
									className="form-check-label"
									htmlFor="exampleCheck1"
								>
									Remember me
								</label>
							</div>

							<Button
								htmlType="submit"
								type="primary"
								size="large"
								block
								loading={authenticating}
							>
								{authenticating ? "Please wait..." : "Submit"}
							</Button>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Login;
