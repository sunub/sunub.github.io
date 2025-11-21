import React from "react";

function useHasMounted() {
	const [hasMounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	return hasMounted;
}

export default useHasMounted;
