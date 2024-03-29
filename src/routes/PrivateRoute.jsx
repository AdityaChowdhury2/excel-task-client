import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useGetCurrentUserQuery } from '../redux/api/apiService';
import Loading from '../components/Loading';

const PrivateRoute = ({ children }) => {
	const { isLoading } = useGetCurrentUserQuery();

	const location = useLocation();
	const { user, loading } = useSelector(state => state.auth);

	if (loading || isLoading) return <Loading />;
	if (!user)
		return <Navigate to={'/login'} state={location.pathname} replace={true} />;

	return <>{children}</>;
};

PrivateRoute.propTypes = {
	children: PropTypes.node.isRequired,
};
export default PrivateRoute;
