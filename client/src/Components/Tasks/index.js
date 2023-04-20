import { Component } from "react"
import TaskItem from "../TaskItem"
import AddTask from '../AddTask'
import UserDetails from "../UserDetails"
import axios from "axios"
import './index.css'


class Tasks extends Component {
    state = {
        isAddTaskVisible: false,
        isEditModalVisible: false,
        isHomePage: false,
        taskToEdit: {},
    }


    onAddTask = () => {
        this.setState({ isAddTaskVisible: true })
    }

    onEditTask = (task) => {
        this.setState({ taskToEdit: task, isEditModalVisible: true, isAddTaskVisible: false })
    }

    onDeleteTask = async (uniqueNo) => {
        try {
            await axios.delete(`http://localhost:5000/${this.props.username}/tasks/${uniqueNo}`);
            const updatedUserDetailsList = this.props.userDetailsList.filter((task) => task._id !== uniqueNo);
            this.props.onUserDetailsListChange(updatedUserDetailsList);
        } catch (error) {
            console.error(error);
        }
    }

    onSaveEditedTask = async (editedTask) => {

        try {
            const response = await axios.put(`http://localhost:5000/${this.props.username}/tasks/${editedTask.uniqueNo}`, editedTask);
            const taskEdited = response.data;

            const updatedUserDetailsList = this.props.userDetailsList.map(each => {
                if (each._id === taskEdited._id) {
                    return taskEdited
                }
                return each
            })
            this.props.onUserDetailsListChange(updatedUserDetailsList);
            this.setState({ isEditModalVisible: false, taskToEdit: {} })
        } catch (error) {
            console.error(error);
        }
    }

    onCancelAddTask = () => {
        this.setState({ isAddTaskVisible: false })
    }

    onAddNewTask = async (newTask) => {

        try {
            const response = await axios.post(`http://localhost:5000/${this.props.username}/tasks`, newTask);
            this.props.onUserDetailsListChange(response.data);
            this.setState({ isAddTaskVisible: false })
        } catch (error) {
            console.error(error);
        }
    }

    onBackClick = () => {
        this.setState({ isHomePage: true })
    }

    handleSortByChange = async (event) => {
        try {
            const sortBy = event.target.value; // Get the selected sort option from the dropdown
            const response = await axios.get(`http://localhost:5000/${this.props.username}/tasks?sortBy=${sortBy}`)
            this.props.onUserDetailsListChange(response.data);
        } catch (error) {
            console.error(error);
        }

    };

    render() {
        const { userDetailsList, username } = this.props;
        if (this.state.isHomePage) {
            return <UserDetails />
        }
        else {
            return (
                <div className="container">
                    <h1 className="heading">Hello, {username}</h1>
                    <div className="buttons-container">
                        <button className="add-task-button" onClick={this.onAddTask}>
                            Click to add your tasks
                        </button>
                        <select className="select1" value='Sort Your tasks' onChange={this.handleSortByChange}>
                            <option value='Sort by'>Sort By</option>
                            <option value="due_date">Due Date</option>
                            <option value="title">title</option>
                            <option value="status">Status</option>
                        </select>

                    </div>
                    <button className="add-task-button back" onClick={this.onBackClick}>
                        Back
                    </button>
                    {this.state.isAddTaskVisible && (
                        <AddTask onCancelAddTask={this.onCancelAddTask} onAddNewTask={this.onAddNewTask} />
                    )}
                    {userDetailsList.map(each => (
                        <TaskItem
                            key={each._id}
                            uniqueNo={each._id}
                            title={each.title}
                            dueDate={each.dueDate}
                            status={each.status}
                            description={each.description}
                            onEdit={() => this.onEditTask(each)}
                            onSaveEdit={this.onSaveEditedTask}
                            onDeleteTask={this.onDeleteTask}
                        />
                    ))}
                </div>
            )
        }
    }
}


export default Tasks
