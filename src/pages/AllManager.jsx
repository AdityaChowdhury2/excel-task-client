import { useGetUsersQuery } from '../redux/api/apiService';

const AllManager = () => {
	const { data: managers } = useGetUsersQuery('manager');

	return (
		<div className="container">
			<h1 className="text-2xl font-bold text-center my-10">All Managers</h1>
			<div className="overflow-x-auto">
				<table className="table">
					<thead>
						<tr>
							<th></th>
							<td className="text-center">Name</td>
							<td className="text-center">Role</td>
						</tr>
					</thead>
					<tbody>
						{managers &&
							managers.map((user, idx) => (
								<tr key={user._id} className={'hover'}>
									<th className="text-center">{idx + 1}</th>
									<td className="text-center">{user.name}</td>
									<td className="text-center">{user.role}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllManager;
