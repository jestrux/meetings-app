const ReactAppFromCDN = () => {
	return (
		<div>
			<main class="bg-white shadow-sm w-75 rounded-lg row overflow-hidden">
				<div class="col-6 border p-0 position-relative">
					<img
						class="position-absolute w-100 h-100"
						src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2NXwwfDF8c2VhcmNofDF8fGZhbmN5JTIwaG91c2V8ZW58MHx8fHwxNjg3NDEzNTg3fDA&ixlib=rb-4.0.3&q=80&w=1080"
						alt=""
						style="object-fit: cover"
					/>
				</div>

				<div
					class="col"
					style="padding-top: 3.5rem; padding-bottom: 4rem"
				>
					<div class="p-5">
						<h3 class="mb-3">Sign in to NIC Meetings</h3>

						<div
							id="alertMessage"
							class="alert alert-success alert-dismissible fade show"
							role="alert"
							style="display: none"
						>
							<strong>Success!</strong> We'll get back to you
							soon.
							<button
								type="button"
								class="close"
								data-dismiss="alert"
								aria-label="Close"
								onclick="toggleAlert()"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>

						<form>
							<div class="form-group">
								<label for="exampleInputEmail1">
									Email address
								</label>
								<input
									type="email"
									class="form-control form-control-lg"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
								/>
							</div>
							<div class="form-group">
								<label for="exampleInputPassword1">
									Password
								</label>
								<input
									type="password"
									class="form-control form-control-lg"
									id="exampleInputPassword1"
								/>
							</div>
							<div class="form-group form-check form-check-lg">
								<input
									type="checkbox"
									class="form-check-input"
									id="exampleCheck1"
								/>
								<label
									class="form-check-label"
									for="exampleCheck1"
								>
									Remember me
								</label>
							</div>
							<button
								type="submit"
								class="btn btn-block btn-lg btn-primary"
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

ReactDOM.render(<ReactAppFromCDN />, document.querySelector("#root"));
