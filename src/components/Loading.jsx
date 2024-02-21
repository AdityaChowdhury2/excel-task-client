import MoonLoader from 'react-spinners/MoonLoader';
const Loading = () => {
	return (
		<div className="w-full h-[calc(100vh-64px)] flex justify-center items-center">
			<MoonLoader
				color={'#233b5d'}
				size={50}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	);
};

export default Loading;
