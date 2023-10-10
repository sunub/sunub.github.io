"use client";

import React from "react";

export const PostContext = React.createContext();

function PostProvider({ children }) {
	const [posts, setPosts] = React.useState(3);

	React.useEffect(() => {
		async function getPost() {
			const res = await fetch("http://localhost:3000/api", {
				method: "POST",
				body: JSON.stringify({
					title: "Test",
					message: "I am testing!",
					userId: 1,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) => {
				console.log(res);
			});
		}

		getPost();
	}, []);

	return (
		<PostContext.Provider value={{ posts, setPosts }}>
			{children}
		</PostContext.Provider>
	);
}

export default PostProvider;
