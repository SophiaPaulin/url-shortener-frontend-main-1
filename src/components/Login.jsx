import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Login = ({ handleLogin }) => {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const { email, password } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await axios.post("http://localhost:9000/api/auth/signin", formData);
			handleLogin();
			toast.success("Logged in successfully", {
				theme: "colored",
			});
			console.log({res})
			localStorage.setItem("token", res.data.token);
			navigate("/urlshortner");
		} catch (err) {
			toast.error(err.response.data.message, {
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
							<h4 className="card-title text-center">Login</h4>
							<form onSubmit={handleSubmit}>
								<div className="form-group">
									<input
										type="email"
										className="form-control"
										name="email"
										placeholder="Enter your email"
										value={email}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="form-group">
									<input
										type="password"
										className="form-control"
										name="password"
										placeholder="Enter your password"
										value={password}
										onChange={handleChange}
										required
									/>
								</div>
								<button type="submit" className="btn btn-primary btn-block">
									{loading ? <Spinner /> : "Login"}
								</button>
							</form>
						</div>
						<div>
							<p className="mt-3 text-center">
								Don't have an account?{" "}
								<Link to="/register" className="card-link ">
									Register here
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
