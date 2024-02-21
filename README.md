# Online Task Management System

## Features:

**Admin Panel**

- Admin can create Projects (Create Project)
- For project creation admin can select only one Manager.
- Edit Project & Delete Project (Projects)
- Can See all Managers (Managers)

**Manager Panel**

- Manager can create new task based on his projects (Add Task).
- Manager can select members (one or multiple) in project creation time.
- Manager can see his projects and coresponding tasks count in a tabular format. (My Projects)

**Member Panel**

- Each Member can see the tasks assigned to him with Task Name, Manager, Priority,
  Project Name, How many days's left for the project and status in a tabular format.
- On clicking in each row it takes to update the task status.
- Member can update status only.
- When member updates an status for a task it will triger an event and the coresponding manager for the task will get an in app notification. Implemented using Socket.io. Please check this [short video](https://youtu.be/_g4dkGVA1Aw)
- Member can Search By Project Name, Task Name, Priority Lavel and Due date.

**Other Features**

- Custom authentication done with jwt.
- Form Validation done with React hook form and yup.

**⚠⚠ Backend is hosted on render ⚠⚠**

    Data loading may take some time.
    Please be patient until the data load.
