import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

const Register = () => {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		userName:"",
		email: "",
		password: "",
	});

	const { userName,email, password } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (password.length < 6 || !/\W/.test(password)) {
			toast.error(
				"Password must be at least 6 characters long and contain at least one special character",
				{
					theme: "colored",
				},
			);
			setLoading(false);
			return;
		}

		try {
			const response = await axios.post("http://localhost:9000/api/auth/register", {
				email,
				userName,
				password,
			});
			toast.success(response.data.message);
			setFormData({
				userName:"",
				email: "",
				password: "",
			});
		} catch (err) {
			toast.error(err.response?.data?.message || "Registration failed", {
				theme: "colored",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card">
						<div className="card-body">
							<h4 className="card-title text-center">Register</h4>
							<form onSubmit={handleSubmit}>
							<div className="form-group">
									<label>User Name</label>
									<input
										type="text"
										className="form-control"
										name="userName"
										value={userName}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="form-group">
									<label>Email</label>
									<input
										type="email"
										className="form-control"
										name="email"
										value={email}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="form-group">
									<label>Password</label>
									<input
										type="password"
										className="form-control"
										name="password"
										value={password}
										onChange={handleChange}
										required
									/>
								</div>
								<button type="submit" className="btn btn-primary btn-block">
									{loading ? <Spinner /> : "Register"}
								</button>
							</form>
						</div>
						<div>
							<p className="mt-3 text-center">
								Already have an account?{" "}
								<Link to="/login" className="card-link ">
									Login here
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
