import React, { Component } from 'react';
import utils from '../services/utils'
import CloseIcon from '@mui/icons-material/Close';

export default class Todo extends Component {
    state = {
        todos: [],
        text: '',
    }

    componentDidMount = () => {
        this.setNewState();
    }

    setNewState = () => {
        this.setState({ todos: this.props.task.todos })
    }

    updateTodo = (ev) => {
        this.setState({ text: ev.target.value })
    }


    onSaveTodo = async () => {
        const todo = {
            text: this.state.text,
            isDone: false,
            id: utils.getRandomId()
        }

        const todos = this.state.todos;
        todos.push(todo);
        this.setState({ todos });
        const newTask = { ...this.props.task, todos: this.state.todos };
        const newBoard = { ...this.props.board, tasks: { ...this.props.board.tasks, [newTask.id]: newTask } }
        const taskTitle = this.props.task.title;
        const msg = `${this.props.user} added a new todo to the task '${taskTitle}'`;
        const notificationType = 'success';
        this.props.updateBoard(newBoard, msg, notificationType);
        this.props.updateProgressBar();

        this.state.text = '';
    }

    onStopPropagation = (ev) => {
        ev.stopPropagation();
    }

    render() {
        return (
            <div className="check-list-item-container flex center text-center"
                onClick={(ev) => this.onStopPropagation(ev)}
            >
                <div className="checklist-closebtn-container">
                    <CloseIcon className="check-list-item-container-close-btn pointer" onClick={ev => this.props.closeAll(ev)} />
                </div>

                <div className="input-container flex column justify-center align-center">
                    <input className="" type="textarea" rows='4' placeholder="add new todo"
                        value={this.state.text}
                        onChange={this.updateTodo} name="text">
                    </input>
                    <button className="save-todo-btn capitalize" onClick={this.onSaveTodo}>add</button>
                </div>

            </div>
        );

    }
}
