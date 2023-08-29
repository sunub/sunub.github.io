import React from "react";

function useMounted() {
	const [hasMounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	return hasMounted;
}

export default useMounted;
