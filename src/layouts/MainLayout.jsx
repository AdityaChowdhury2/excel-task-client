import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
// import { useGetCurrentUserQuery } from '../redux/api/apiService';
const MainLayout = () => {
	// const { data: currentUser, isLoading, isError } = useGetCurrentUserQuery();

	// console.log(currentUser);

	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};

export default MainLayout;
