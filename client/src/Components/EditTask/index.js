import React, { Component } from 'react';
import './index.css'

class EditTask extends Component {
    state = {
        uniqueNo: this.props.uniqueNo,
        title: this.props.title,
        description: this.props.description,
        dueDate: this.props.dueDate,
        status: this.props.status
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { uniqueNo, title, description, dueDate, status } = this.state;
        if (!title || !dueDate) {
            alert('Please fill in required fields');
            return;
        }
        const saveTask = { uniqueNo, title, description, dueDate, status };
        this.props.saveEdit(saveTask);
        this.handleClose()
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

    handleClose = () => {
        this.props.closeEdit();
    };

    render() {
        return (
            <div className='editform'>
                <p className='edittask'>Edit Your Task</p>
                <form onSubmit={this.handleSubmit} className="app">
                    <input
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
                    <button type="submit">Save</button>
                    <button type="button" onClick={this.handleClose}>
                        Close
                    </button>
                </form>
                <ul></ul>
            </div>
        );
    }
}

export default EditTask;
