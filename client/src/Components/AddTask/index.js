import React, { Component } from 'react';
import './index.css'

class AddTask extends Component {
    state = {
        title: '',
        description: '',
        dueDate: '',
        status: 'In Progress'
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { title, description, dueDate, status } = this.state;
        if (!title || !dueDate) {
            alert('Please fill in required fields');
            return;
        }
        const newTask = { title, description, dueDate, status };
        this.props.onAddNewTask(newTask);
        this.setState({ title: '', description: '', dueDate: '', status: 'In Progress' });
    };

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    };

    handleDescriptionChange = (event) => {
        this.setState({ description: event.target.value });
    };

    handleDueDateChange = (event) => {
        this.setState({ dueDate: event.target.value });
    };

    handleStatusChange = (event) => {
        this.setState({ status: event.target.value });
    };

    handleCancel = () => {
        this.props.onCancelAddTask();
    };

    render() {
        return (
            <div className='task-tracker-form'>
                <h1>Add Your Task</h1>
                <form onSubmit={this.handleSubmit} className="app">
                    <input className='input'
                        type="text"
                        placeholder="Title"
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                    />
                    <textarea
                        placeholder="Description"
                        value={this.state.description}
                        onChange={this.handleDescriptionChange}
                    ></textarea>
                    <input
                        type="date"
                        placeholder="Due Date"
                        value={this.state.dueDate}
                        onChange={this.handleDueDateChange}
                    />
                    <select value={this.state.status} onChange={this.handleStatusChange}>
                        <option value="In Progress">In Progress</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <button type="submit">Add Task</button>
                    <button type="button" onClick={this.handleCancel}>
                        Cancel
                    </button>
                </form>
                <ul></ul>
            </div>
        );
    }
}

export default AddTask;
