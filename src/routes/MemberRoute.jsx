import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useGetCurrentUserQuery } from '../redux/api/apiService';
import Loading from '../components/Loading';

const MemberRoute = ({ children }) => {
	const { isLoading } = useGetCurrentUserQuery();

	const location = useLocation();
	const { user, loading } = useSelector(state => state.auth);

	if (loading || isLoading) return <Loading />;
	else if (user?.email && user?.role === 'member') return <>{children}</>;
	else
		return (
			<Navigate
				to={location.state || '/'}
				state={location.pathname}
				replace={true}
			/>
		);
};

MemberRoute.propTypes = {
	children: PropTypes.node.isRequired,
};
export default MemberRoute;
