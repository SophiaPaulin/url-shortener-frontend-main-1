import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const CreateUrlShortner = () => {
	const [longUrl, setLongUrl] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		const token = localStorage.getItem("token");
		console.log({token, longUrl})
		try {
			const res = await axios.post(
				"http://localhost:9000/api/url/create",
				{ longUrl },
				{
					headers: { authorization: token },
				},
			);
			console.log({res})
			toast.success(`Short URL created`, {
				theme: "colored",
			});
			setLongUrl("");
			navigate("/dashboard")
		} catch (err) {
			toast.error("Failed to shorten URL", {
				theme: "colored",
			});
		}
	};

	return (
		<div className="container mt-4">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card">
						<div className="card-body">
							<div className="card-title text-center">Create URL</div>
							<form onSubmit={handleSubmit}>
								<div className="form-group">
									<label>Long Url</label>
									<input
										type="url"
										className="form-control"
										value={longUrl}
										onChange={(e) => setLongUrl(e.target.value)}
										required
									/>
								</div>
								<div className="row">
									<div className="col-md-6">
										<Link
											className="btn btn-outline-secondary btn-block"
											to="/dashboard"
										>
											Cancel
										</Link>
									</div>
									<div className="col-md-6">
										<button type="submit" className="btn btn-primary btn-block">
											Submit
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateUrlShortner;
