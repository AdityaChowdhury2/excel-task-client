import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
const PrivateRoute = ({ children }) => {
	const location = useLocation();
	const { user, loading } = useSelector(state => state.auth);
	console.log(user);
	if (user?.email) return <>{children}</>;
	else if (loading) return <div>Loading...</div>;
	else
		return <Navigate to={'/login'} state={location.pathname} replace={true} />;
};

PrivateRoute.propTypes = {
	children: PropTypes.node.isRequired,
};
export default PrivateRoute;
