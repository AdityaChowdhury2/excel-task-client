import {
	useDeleteProjectMutation,
	// useGetCurrentUserQuery,
	useGetProjectsQuery,
} from '../../redux/api/apiService';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { FaRegEdit } from 'react-icons/fa';
// import { useState } from 'react';
import UpdateProjectModal from '../../components/UpdateProjectModal';

const AllProjects = () => {
	const { data: projects } = useGetProjectsQuery();

	const handleOpenModal = id => {
		document.getElementById(`update_project_modal_${id}`).showModal();
	};

	const handleCloseModal = id => {
		document.getElementById(`update_project_modal_${id}`).close();
	};

	const [deleteProject] = useDeleteProjectMutation();
	// const handleUpdate = id => {

	// };
	const handleDelete = id => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then(async result => {
			if (result.isConfirmed) {
				const response = await deleteProject(id);
				// console.log(response);
				if (response.data.deletedCount)
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Deleted!',
						showConfirmButton: false,
						timer: 1500,
					});
			}
		});
	};
	return (
		<div className="container">
			<h1 className="text-2xl font-bold text-center my-10">All Projects</h1>
			<div className="overflow-x-auto">
				<table className="table">
					<thead>
						<tr>
							<th></th>
							<td className="text-center">Name</td>
							<td className="text-center">Assigned To</td>
							<td className="text-center">Action</td>
						</tr>
					</thead>
					<tbody>
						{projects &&
							projects.map((project, idx) => (
								<tr key={project._id} className={'hover'}>
									<th className="text-center">{idx + 1}</th>
									<td className="text-center">{project.project_name}</td>
									<td className="text-center">{project.assigned_to_name}</td>
									<td className="flex justify-center gap-2">
										<button
											className="btn btn-sm"
											onClick={() => handleOpenModal(project._id)}
										>
											<FaRegEdit color="green" />
										</button>
										<button
											className="btn btn-sm"
											onClick={() => handleDelete(project._id)}
										>
											<FaTrashAlt color="red" />
										</button>
										<UpdateProjectModal
											project={project}
											handleCloseModal={handleCloseModal}
										/>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllProjects;
