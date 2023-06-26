import { useState } from "react";

const Login = () => {

	const [isLoading, setLoading] = useState(false)

	const handleSubmitForm = (e) => {
		e.preventDefault()
		setLoading(true)
		let form = new FormData(e.currentTarget)
		let email = form.get("email")
		let password = form.get("password")

		console.log(email)
		console.log(password)

		setLoading(false)
		e.currentTarget.reset()
	}
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

						<form onClick={handleSubmitForm}>
							<div className="form-group">
								<label htmlFor="exampleInputEmail1">
									Email address
								</label>
								<input
									type="email"
									name="email"
									className="form-control form-control-lg"
									id="exampleInputEmail1"
									required={true}
									aria-describedby="emailHelp"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="exampleInputPassword1">
									Password
								</label>
								<input
									type="password"
									name="password"
									className="form-control form-control-lg"
									required={true}
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
								disabled={isLoading}
							>
								{isLoading? 'loading...': 'submit'}
							</button>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Login;
