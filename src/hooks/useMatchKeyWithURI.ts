// Step-by-step plan:
// 1. Import necessary hooks from React (useState, useEffect).
// 2. Define the custom hook, e.g., useMatchKeyWithURI.
// 3. Inside the hook, use useState to create a state variable to hold the match status (true/false).
// 4. Use useEffect to react to changes in the URL.
//    a. Inside useEffect, get the current URL using window.location.href.
//    b. Extract the URI from the URL.
//    c. Compare the extracted URI with the submitted key.
//    d. Update the state variable based on the comparison result.
// 5. Return the state variable from the hook.

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const useMatchKeyWithURI = (key: string) => {
	const [isMatch, setIsMatch] = useState(false);
	const router = useRouter();

	useEffect(() => {
		// Use router.asPath to get the current path instead of window.location.pathname
		const currentURI = router.asPath;
		setIsMatch(currentURI === key);
	}, [key, router.asPath]); // Add router.asPath to the dependency array

	return isMatch;
};

export default useMatchKeyWithURI;
