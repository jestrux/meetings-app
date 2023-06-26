import useAPI from "./hooks/useAPI";

const Login = () => {
	// Returns promise
	const { login } = useAPI();
	const handleLogin = () => {};

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

						<div
							id="alertMessage"
							className="alert alert-success alert-dismissible fade show"
							role="alert"
							style={{ display: "none" }}
						>
							<strong>Success!</strong> We'll get back to you
							soon.
							<button
								type="button"
								className="close"
								data-dismiss="alert"
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>

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
								<input
									type="password"
									className="form-control form-control-lg"
									name="password"
									id="exampleInputPassword1"
								/>
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
							<button
								type="submit"
								className="btn btn-block btn-lg btn-primary"
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Login;
