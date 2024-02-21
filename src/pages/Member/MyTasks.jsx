import { useGetTasksQuery } from '../../redux/api/apiService';
import { useNavigate } from 'react-router-dom';
// import { formatDate } from '../../utils/dateFormatter';
import { useState } from 'react';
import { FaRegCalendar } from 'react-icons/fa';
import DatePicker from 'react-datepicker';

const MyTasks = () => {
	const [searchText, setSearchText] = useState('');
	const [searchBy, setSearchBy] = useState('title');

	const { data: tasks } = useGetTasksQuery({ searchText, searchBy });
	const navigate = useNavigate();
	// console.log(searchText);
	return (
		<div className="container px-5">
			<h1 className="text-2xl font-bold text-center my-10">My Tasks</h1>

			<div className="mb-10 flex flex-col lg:flex-row gap-4 lg:justify-between">
				<label className="form-control w-full lg:max-w-sm">
					{/* <div className="label">
						<span className="label-text">Se</span>
					</div> */}
					{searchBy !== 'dueDate' ? (
						<input
							type="text"
							placeholder={`Search by ${
								searchBy === 'projectName' ? 'project' : searchBy
							}`}
							value={typeof searchText === 'object' ? '' : searchText}
							onChange={e => setSearchText(e.target.value)}
							className="input input-bordered w-full"
						/>
					) : (
						<DatePicker
							showIcon
							dateFormat="d MMM yyyy"
							minDate={new Date()}
							selected={searchText}
							showTimeSelect={false}
							dropdownMode="select"
							isClearable
							placeholderText="Click to select Due Date"
							shouldCloseOnSelect
							onChange={date => {
								if (date) setSearchText(date?.toISOString());
								else setSearchText('');
							}}
							calendarIconClassname="mt-2"
							className="input input-bordered w-full "
							icon={<FaRegCalendar />}
						/>
					)}
				</label>
				<label className="form-control w-full lg:max-w-sm">
					{/* <div className="label">*/}
					{/* <span className="label-text">Pick the best fantasy franchise</span> */}
					{/* </div>  */}
					<select
						className="select select-bordered"
						value={searchBy}
						onChange={e => {
							setSearchBy(e.target.value);
							setSearchText('');
						}}
					>
						<option value={'title'}>Title</option>
						<option value={'priorityLevel'}>Priorities</option>
						<option value={'dueDate'}>Due Date</option>
						<option value={'projectName'}>Project</option>
					</select>
				</label>
			</div>

			<div className="overflow-x-auto">
				<table className="table ">
					<thead>
						<tr>
							<th></th>
							<td>Task Name</td>
							<td>Manager</td>
							<td>Priority</td>
							<td>Project</td>
							{/* <td>Due Date</td> */}
							<td>Day&apos;s left</td>
							<td>Status</td>
						</tr>
					</thead>
					<tbody>
						{tasks && tasks.length ? (
							tasks.map((task, idx) => (
								<tr
									key={task._id}
									className={'hover hover:cursor-pointer'}
									onClick={() => navigate(`/my-tasks/${task._id}`)}
								>
									<th>{idx + 1}</th>
									<td>{task.title}</td>
									<td>{task?.createdByName}</td>
									<td>{task?.priorityLevel}</td>
									<td>{task?.projectName}</td>
									<td>
										{task.daysLeft === 1
											? `${task.daysLeft} day`
											: `${task.daysLeft} day's`}{' '}
										left
									</td>
									{/* <td>{formatDate(task?.dueDate)}</td> */}
									<td>
										{task.status === 'todo'
											? 'To Do'
											: task.status === 'inprogress'
											? 'In Progress'
											: 'Completed'}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={7} className="text-center">
									No tasks found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyTasks;
