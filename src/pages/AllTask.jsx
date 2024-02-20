import { useGetTasksQuery } from '../redux/api/apiService';
import { formatDate } from '../utils/dateFormatter';

const AllTask = () => {
	const { data: tasks } = useGetTasksQuery();
	// console.log(tasks);

	return (
		<div className="container ">
			<h1 className="text-2xl font-bold text-center my-10">All Tasks</h1>
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
							<td>Stage</td>
						</tr>
					</thead>
					<tbody>
						{tasks &&
							tasks.map((task, idx) => (
								<tr key={task._id} className={'hover'}>
									<th>{idx + 1}</th>
									<td>{task.title}</td>
									<td>{task?.manager || 'aditya'}</td>
									<td>{task?.priority || 'High'}</td>
									<td>{formatDate(task?.dueDate)}</td>
									<td>{task?.status || 'Todo'}</td>
									<td>{formatDate(task?.createdAt)}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllTask;
