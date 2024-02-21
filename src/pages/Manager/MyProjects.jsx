// import { useNavigate } from 'react-router-dom';
import { useGetProjectsQuery } from '../../redux/api/apiService';

const MyProjects = () => {
	const { data: projects } = useGetProjectsQuery();
	// const navigate = useNavigate();

	return (
		<div className="container">
			<h1 className="text-2xl font-bold text-center my-10">My Projects</h1>
			<div className="overflow-x-auto">
				<table className="table border-t-2 border-r-2 border-l-2">
					<thead>
						<tr>
							<th className="border-r-2"></th>
							<td className="text-center border-r-2">Name</td>
							<td className="text-center">Tasks</td>
						</tr>
					</thead>
					<tbody>
						{projects &&
							projects.map((project, idx) => (
								<tr
									key={project._id}
									// onClick={() => navigate('/')}
									className="hover border-b-2"
								>
									<th className="text-center border-r-2">{idx + 1}</th>
									<td className="text-center border-r-2">
										{project.project_name}
									</td>
									<td className="text-center">
										{project.tasksLength
											? project.tasksLength
											: 'No Task Created Yet'}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyProjects;
