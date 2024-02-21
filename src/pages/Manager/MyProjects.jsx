import { useNavigate } from 'react-router-dom';
import { useGetProjectsQuery } from '../../redux/api/apiService';

const MyProjects = () => {
	const { data: projects } = useGetProjectsQuery();
	const navigate = useNavigate();
	return (
		<div className="container">
			<h1 className="text-2xl font-bold text-center my-10">My Projects</h1>
			<div className="overflow-x-auto">
				<table className="table">
					<thead>
						<tr>
							<th></th>
							<td className="text-center">Name</td>
						</tr>
					</thead>
					<tbody>
						{projects &&
							projects.map((project, idx) => (
								<tr
									key={project._id}
									onClick={() => navigate('/')}
									className={'hover'}
								>
									<th className="text-center">{idx + 1}</th>
									<td className="text-center">{project.project_name}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyProjects;
