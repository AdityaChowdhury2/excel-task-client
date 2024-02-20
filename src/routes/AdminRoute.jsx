import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useGetCurrentUserQuery } from '../redux/api/apiService';

const AdminRoute = ({ children }) => {
	const { isLoading } = useGetCurrentUserQuery();

	const location = useLocation();
	const { user, loading } = useSelector(state => state.auth);

	if (loading || isLoading) return <div>Loading...</div>;
	else if (user?.email && user?.role === 'admin') return <>{children}</>;
	else
		return <Navigate to={'/login'} state={location.pathname} replace={true} />;
};

AdminRoute.propTypes = {
	children: PropTypes.node.isRequired,
};
export default AdminRoute;
