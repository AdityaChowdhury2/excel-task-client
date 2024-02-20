import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useGetCurrentUserQuery } from '../redux/api/apiService';

const PrivateRoute = ({ children }) => {
	const { isLoading } = useGetCurrentUserQuery();

	const location = useLocation();
	const { user, loading } = useSelector(state => state.auth);

	if (!user?.email)
		return <Navigate to={'/login'} state={location.pathname} replace={true} />;
	else if (loading || isLoading) return <div>Loading...</div>;
	else return <>{children}</>;
};

PrivateRoute.propTypes = {
	children: PropTypes.node.isRequired,
};
export default PrivateRoute;
