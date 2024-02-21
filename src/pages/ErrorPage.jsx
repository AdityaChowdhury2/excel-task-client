const ErrorPage = () => {
	return (
		<div className="w-full h-[calc(100vh-64px)] flex justify-center items-center px-2">
			<h1 className="text-4xl font-bold text-red-600 border-r-2 border-red-400">
				Error 404
			</h1>
			<p className="text-lg text-gray-700 mt-4 ml-2">
				The page you are looking for does not exist.
			</p>
		</div>
	);
};

export default ErrorPage;
