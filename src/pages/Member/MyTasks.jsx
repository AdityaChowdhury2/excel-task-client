import { useGetTasksQuery } from '../../redux/api/apiService';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/dateFormatter';

const MyTasks = () => {
	const { data: tasks } = useGetTasksQuery();
	const navigate = useNavigate();
	return (
		<div className="container ">
			<h1 className="text-2xl font-bold text-center my-10">My Tasks</h1>
			<div className="overflow-x-auto">
				<table className="table ">
					<thead>
						<tr>
							<th></th>
							<td>Task Name</td>
							<td>Manager</td>
							<td>Priority</td>
							<td>Due Date</td>
							<td>Status</td>
						</tr>
					</thead>
					<tbody>
						{tasks &&
							tasks.map((task, idx) => (
								<tr
									key={task._id}
									className={'hover'}
									onClick={() => navigate(`/my-tasks/${task._id}`)}
								>
									<th>{idx + 1}</th>
									<td>{task.title}</td>
									<td>{task?.createdByName}</td>
									<td>{task?.priorityLevel}</td>
									<td>{formatDate(task?.dueDate)}</td>
									<td>
										{task.status === 'todo'
											? 'To Do'
											: task.status === 'inprogress'
											? 'In Progress'
											: 'Completed'}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyTasks;
