import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const UrlTableData = () => {
	const [urls, setUrls] = useState([]);
	
	const fetchUrls = async () => {
		try {
			const response = await axios.get("http://localhost:9000/api/url/getUrls", {
				headers: {
					authorization: `${localStorage.getItem("token")}`,
				},
			});
			if (response.data && response.data.result) {
				setUrls(response.data.result);
			} else {
				setUrls([]);
			}
		} catch (error) {
			toast.error(error.response?.data?.message || "Error fetching URLs", {
				theme: "colored",
			});
		}
	};

	const handleClickUrl =async (shortId, longUrl) =>{
		console.log(shortId, longUrl)
		try {
			const token = localStorage.getItem("token")
			const response = await axios.get(`http://localhost:9000/api/url/${shortId}`, {
				headers: {
					authorization: token,
				},
			});
			console.log({response});
			if (response.status === 200) window.open(longUrl)
			fetchUrls();
			
		} catch (error) {
			toast.error(error.response?.data?.message || "Error fetching URLs", {
				theme: "colored",
			});
		}
	}

	useEffect(() => {
		fetchUrls();
	}, []);

	return (
		<div className="container-fluid mt-4 mb-3">
			<div className="card">
				<div className="card-body">
					<div className="card-title">
						<div className="row">
							<div className="col-md-6">Url Lists</div>
							<div className="col-md-6 text-right">
								<Link to="/urlshortner/create">
									<i className="fa fa-plus"></i>
								</Link>
							</div>
						</div>
					</div>
					<div className="card-body">
						<table className="table table-striped table-responsive-sm">
							<thead>
								<tr>
									<th>S.No</th>
									<th>Short URL</th>
									<th>Long URL</th>
									<th>Click Count</th>
								</tr>
							</thead>
							<tbody>
								{urls && urls.length > 0 && urls.map((url, index) => (
									<tr key={url._id}>
										<td>{index+1}</td>
										<td>
											<a
												// href={url.longUrl}
												// target="_blank"
												rel="noopener noreferrer"
												className="card-link url-link"
												onClick={() =>handleClickUrl(url.urlCode, url.longUrl)}
											>
												{`url-shortener/${url.urlCode}`}
											</a>
										</td>
										<td>{url.longUrl}</td>
										<td>{url.clicks}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UrlTableData;
