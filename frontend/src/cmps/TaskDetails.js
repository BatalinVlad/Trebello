import React, { Component } from 'react';
import moment from 'moment';

// import Avatar from '@material-ui/core/Avatar';
//icons :

import NotesIcon from '@mui/icons-material/Notes';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';

import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';


import DueDate from './DueDate';
import Labels from './Labels';
import Members from './Members';
import Todos from './Todos';
import TaskBgColor from './TaskBgColor'

import utils from '../services/utils'

export default class TaskDetails extends Component {
    state = {
        description: '',
        teamMembers: [],
        choosenMembers: [],
        choosenlabels: [],
        showActivity: false,
        showEditDescriptionForm: false,
        toggleChooseLabels: false,
        toggleChooseMembers: false,
        toggleTodos: false,
        toggleDueDate: false,
        toggleDeleteTodo: false,
        toggleUploadImage: false,
        toggleTaskBgColor: false,
        progressWidth: 0,
        currTodoId: '',
        taskTitle: '',
        imageLink: ''
    }

    componentDidMount() {
        const currTask = this.props.board.tasks[this.props.taskId]
        this.setState({ description: currTask.description }, this.updateProgressBar);
    }

    onStopPropagationAndCloseOptions = (ev) => {
        ev && ev.stopPropagation();
        this.setState({
            toggleDueDate: false,
            toggleTodos: false,
            toggleChooseLabels: false,
            toggleChooseMembers: false,
            toggleUploadImage: false,
            toggleTaskBgColor: false
        })
    }

    emitChange = (ev) => {
        this.setState({ taskTitle: ev.target.innerText });
    }

    openUpdateDescriptionForm = () => {
        this.setState({ showEditDescriptionForm: true })
    }

    onToggleDueDate = ev => {
        // ev && ev.stopPropagation();
        this.onStopPropagationAndCloseOptions(ev);
        this.setState(prevState => ({ toggleDueDate: !prevState.toggleDueDate }))
    }

    toggleUploadImageHandler = ev => {
        // ev && ev.stopPropagation();
        this.onStopPropagationAndCloseOptions(ev);
        this.setState(prevState => ({ toggleUploadImage: !prevState.toggleUploadImage }))
    }

    toggleTaskBgColorHandler = ev => {
        // ev && ev.stopPropagation();
        this.onStopPropagationAndCloseOptions(ev);
        this.setState(prevState => ({ toggleTaskBgColor: !prevState.toggleTaskBgColor }))
    }


    closeUpdateDescriptionForm = () => {
        this.setState({ showEditDescriptionForm: false })
    }



    toggleChooseLabels = (ev) => {
        // ev.stopPropagation();
        this.onStopPropagationAndCloseOptions(ev);
        this.setState(prevState => ({ toggleChooseLabels: !prevState.toggleChooseLabels }))
    }

    onSaveDescription = (ev, task) => {
        ev.stopPropagation();
        const newTask = { ...task, description: this.state.description };
        const newBoard = {
            ...this.props.board,
            tasks: {
                ...this.props.board.tasks,
                [newTask.id]: newTask
            }
        }
        const msg = `The description of '${task.title}' was changed by ${this.props.user}`;
        const notificationType = 'success';
        this.props.updateBoard(newBoard, msg, notificationType);
        this.closeUpdateDescriptionForm();
    }

    toggleChooseMembers = (ev) => {
        this.onStopPropagationAndCloseOptions(ev);
        this.setState(prevState => ({ toggleChooseMembers: !prevState.toggleChooseMembers }))
    }

    toggleTodos = (ev) => {
        this.onStopPropagationAndCloseOptions(ev);
        this.setState(prevState => ({ toggleTodos: !prevState.toggleTodos }))
    }

    onDuplicateTask = (column, task) => {
        const newTask = { ...task, id: utils.getRandomId(), labels: [...task.labels], todos: [...task.todos], taskTeamMembers: [...task.taskTeamMembers] };
        column.taskIds.push(newTask.id);
        const newBoard = {
            ...this.props.board,
            tasks: {
                ...this.props.board.tasks,
                [newTask.id]: newTask
            }
        }
        const msg = `The task '${task.title}' was duplicated by ${this.props.user}`;
        const notificationType = 'success';
        this.props.updateBoard(newBoard, msg, notificationType);
        this.props.toggleTaskDetails();
    }

    onDeleteTask = (column, task) => {
        const board = { ...this.props.board };
        const taskIds = column.taskIds;
        const idx = taskIds.findIndex(taskId => taskId === task.id);
        taskIds.splice(idx, 1);
        delete board.tasks[task.id];
        const msg = `'${task.title}' was deleted by ${this.props.user}`;
        const notificationType = 'danger';
        this.props.updateBoard(board, msg, notificationType);
        this.props.toggleTaskDetails();
    }

    toggleTodoDone = async (todo) => {
        todo.isDone = !todo.isDone;
        let newTask = { ...this.props.board.tasks[this.props.taskId] };
        const todos = newTask.todos;
        const idx = todos.findIndex(currTodo => (currTodo.id === todo.id));
        todos[idx].isDone = todo.isDone;
        let doneTodosCounter = newTask.todos.filter(todo => (todo.isDone)).length;
        newTask.todosDone = doneTodosCounter;
        let msg = '';
        let notificationType = '';
        const newBoard = {
            ...this.props.board,
            tasks: {
                ...this.props.board.tasks,
                [newTask.id]: newTask
            }
        }
        if (todo.isDone) {
            msg = `The subtask '${todo.text}' in '${newTask.title}' was completed by ${this.props.user}`;
            notificationType = 'success';
        } else {
            msg = `The subtask '${todo.text}' in '${newTask.title}' was remarked as uncompleted by ${this.props.user}`;
            notificationType = 'danger';
        }
        this.props.updateBoard(newBoard, msg, notificationType);
        this.updateProgressBar()
    }

    updateProgressBar = () => {
        let start = this.state.progressWidth;
        let task = this.props.board.tasks[this.props.taskId];
        let doneTodosCounter = task.todos.filter(todo => (todo.isDone)).length;
        task.todosDone = doneTodosCounter;

        let interval;
        let progressWidth = Math.round((doneTodosCounter / task.todos.length) * 100);
        if (!progressWidth && !start) return;
        if (start < progressWidth) {
            interval = setInterval(() => {
                if (start >= progressWidth) {
                    clearInterval(interval);
                } else {
                    start++;
                    this.setState({ progressWidth: start })
                }
            }, 10);
        } else {
            interval = setInterval(() => {
                if (start <= progressWidth) {
                    clearInterval(interval);
                } else {
                    start--;
                    this.setState({ progressWidth: start })
                }
            }, 10);
        }
    }

    deleteTodo = (todoId) => {
        const task = this.props.board.tasks[this.props.taskId];
        let todos = task.todos;
        const idx = todos.findIndex(currTodo => (currTodo.id === todoId));
        const deletedTodo = todos[idx];
        todos.splice(idx, 1);
        const newBoard = {
            ...this.props.board,
            tasks: {
                ...this.props.board.tasks,
                [task.id]: task
            }
        }
        const msg = `The subtask '${deletedTodo.text}' in '${task.title}' was deleted by ${this.props.user}`;
        const notificationType = 'danger';
        this.props.updateBoard(newBoard, msg, notificationType);
        this.updateProgressBar();
        this.hideDeleteTodoButton(todoId);
    }

    showDeleteTodoButton = (todoId) => {
        this.setState({ toggleDeleteTodo: true, currTodoId: todoId });
    }

    hideDeleteTodoButton = (todoId) => {
        this.setState({ toggleDeleteTodo: false, currTodoId: todoId });
    }

    setTaskName = (taskId) => {
        const taskTitle = this.props.board.tasks[taskId].title;
        this.setState({ taskTitle: taskTitle });
    }

    changeDescription = (ev) => {
        this.setState({ description: ev.target.value });
    }

    saveTaskName = (taskId, title) => {
        const taskTitle = this.props.board.tasks[taskId].title;
        if (taskTitle === title) return;

        const updatedBoard = { ...this.props.board };
        updatedBoard.tasks[taskId].title = title;

        const msg = `${this.props.user} changed the title of the task '${taskTitle}' to '${title}'`;
        const notificationType = 'success';
        this.props.updateBoard(updatedBoard, msg, notificationType);
    }

    handleImageLinkChange = ev => {
        this.setState({ imageLink: ev.target.value });
    }

    checkImageLink = () => {
        const imgREGEX = /.(jpg|jpeg|png|gif)\/?$/;
        if (this.state.imageLink.match(imgREGEX)) this.uploadTaskImage();
    }

    uploadTaskImage = async (ev) => {
        const task = this.props.board.tasks[this.props.taskId];
        const newColumn = { ...this.props.column }
        newColumn.taskIds = this.props.column.taskIds.slice();
        let imageUrl = '';
        if (ev) {
            const file = ev.target.files[0];
            imageUrl = await utils.uploadImg(file)
        } else {
            imageUrl = this.state.imageLink;
        }
        const newTask = { ...task }
        newTask.type = 'image';
        newTask.url = imageUrl;
        newTask.taskTeamMembers = [...task.taskTeamMembers];
        const newBoard = {
            ...this.props.board,
            columns: {
                ...this.props.board.columns,
                [newColumn.id]: newColumn
            },
            tasks: {
                ...this.props.board.tasks,
                [newTask.id]: newTask
            }
        }

        const msg = `${this.props.user} changed task ${this.props.board.tasks[this.props.taskId]}`;
        const notificationType = 'success';
        this.props.updateBoard(newBoard, msg, notificationType);
        this.props.toggleTaskDetails();
    }


    render() {
        const task = this.props.board.tasks[this.props.taskId];
        const { column } = this.props;
        return (
            <div className="screen flex center" onClick={() => this.props.toggleTaskDetails()}>
                <div className="task-details-container-wrapper flex" onClick={(ev) => this.onStopPropagationAndCloseOptions(ev)}>
                    <div className="task-details-container flex relative">
                        <CloseIcon className="back flex center"
                            onClick={() => this.props.toggleTaskDetails()} />
                        <div className="task-details-container-main">
                            <div className="task_title flex">
                                <DescriptionOutlinedIcon className='main_icon flex center' />
                                <div className='main_item  flex column'>
                                    <h2
                                        contentEditable='true'
                                        spellCheck="false"
                                        onFocus={() => this.setTaskName(task.id)}
                                        onInput={(ev) => this.emitChange(ev)}
                                        onBlur={() => this.saveTaskName(task.id, this.state.taskTitle)}
                                        suppressContentEditableWarning={true}
                                    >
                                        {task.title}
                                    </h2>
                                    <div className="task-details-container-in-list flex">
                                        <p>in list <span>{column.title}</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="chosen-labels-container ">
                                {this.state.toggleChooseLabels &&
                                    <Labels
                                        closeAll={this.onStopPropagationAndCloseOptions}
                                        toggleChooseLabels={this.toggleChooseLabels}
                                        board={this.props.board}
                                        task={task}
                                        updateBoard={this.props.updateBoard}
                                    />
                                }
                                {task.labels.length !== 0 &&
                                    <div className='flex'>
                                        <LabelOutlinedIcon className='main_icon' />
                                        <div className='main_item flex column'>
                                            <h2>Labels</h2>
                                            <div className="labels-choosen-container flex">
                                                {
                                                    task.labels.map(label => {
                                                        return <div key={label} className={label + ' medium-label'}>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>

                            {this.state.toggleTaskBgColor &&
                                <TaskBgColor
                                    closeAll={this.onStopPropagationAndCloseOptions}
                                    toggleTaskBgColorHandler={this.toggleTaskBgColorHandler}
                                    board={this.props.board}
                                    task={task}
                                    updateBoard={this.props.updateBoard}
                                    user={this.props.user}
                                />
                            }

                            <div className="main-members-container">
                                {this.state.toggleChooseMembers &&
                                    <Members
                                        closeAll={this.onStopPropagationAndCloseOptions}
                                        toggleChooseMembers={this.toggleChooseMembers}
                                        board={this.props.board}
                                        task={task}
                                        updateBoard={this.props.updateBoard}
                                        users={this.props.users}
                                    />
                                }

                                {task.taskTeamMembers.length !== 0 &&
                                    <div className='flex'>
                                        <PersonAddOutlinedIcon className='main_icon' />
                                        <div className='main_item flex column'>
                                            <h2>Members</h2>
                                            <div className="flex asigned-team-members-container">
                                                {task.taskTeamMembers.map(member => {
                                                    return <div key={member._id} className="task-details-container-team-member" >
                                                        <span className="uppercase fs14 flex center">
                                                            {utils.createUserIcon(member.firstName,
                                                                member.lastName)}
                                                        </span>
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>

                            {this.state.toggleTodos &&
                                <Todos
                                    closeAll={this.onStopPropagationAndCloseOptions}
                                    toggleTodos={this.toggleTodos}
                                    board={this.props.board}
                                    user={this.props.user}
                                    task={task}
                                    updateBoard={this.props.updateBoard}
                                    updateProgressBar={this.updateProgressBar}
                                />
                            }
                            {task.todos &&
                                <div className="check-list-container flex">
                                    <AssignmentTurnedInOutlinedIcon className='main_icon' />
                                    <div className='main_item flex column'>
                                        <h2>Checklist</h2>
                                        <div className="items wrapper">
                                            <div className="items flex column">
                                                {task.todos.map(todo => {
                                                    return <div key={todo.id} className="item flex align-center space-between" onMouseEnter={() => this.showDeleteTodoButton(todo.id)}
                                                        onMouseLeave={() => this.hideDeleteTodoButton(todo.id)}>
                                                        <div className="flex align-center">
                                                            <input type="checkbox" onChange={() => this.toggleTodoDone(todo)} checked={todo.isDone ? 'checked' : ''}>
                                                            </input>
                                                            <p className={todo.isDone ? "text-decoration" : ''}>
                                                                {todo.text}
                                                            </p>
                                                        </div>
                                                        <DeleteOutlineIcon
                                                            onClick={() => this.deleteTodo(todo.id)}
                                                            className="pointer delete-btn"
                                                            style={{ display: this.state.toggleDeleteTodo && this.state.currTodoId === todo.id ? 'block' : 'none' }}
                                                        />
                                                    </div>
                                                })
                                                }
                                            </div>
                                        </div>
                                        {task.todos.length !== 0 &&
                                            <div className="check-list-progress">
                                                <div className="progress fill-height flex align-center" style={{ width: this.state.progressWidth + "%", color: 'black' }} >
                                                    <small className="fill-width text-center">{this.state.progressWidth + "%"}</small>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>

                            }
                            <div className="duedate-container flex">
                                <EventOutlinedIcon className='main_icon' />
                                <div className='main_item flex column'>
                                    <h2>Due Date</h2>
                                    {(task.dueDate) ?
                                        <p>{moment(task.dueDate).format("MMMM Do YYYY, hh:mm a")}</p>
                                        :
                                        <p>no date selected..</p>
                                    }
                                </div>
                                {this.state.toggleDueDate && <DueDate
                                    task={task}
                                    closeAll={this.onStopPropagationAndCloseOptions}
                                    board={this.props.board}
                                    updateBoard={this.props.updateBoard}
                                    updateProgressBar={this.updateProgressBar}
                                    user={this.props.user}
                                />}
                            </div>

                            <div className="description flex">
                                <NotesIcon className='main_icon' />

                                <div className='main_item flex column'>
                                    <h2>Description</h2>
                                    <textarea className="fill-width"
                                        name="description"
                                        cols="40"
                                        onChange={this.changeDescription}
                                        onClick={this.openUpdateDescriptionForm}
                                        value={this.state.description}
                                        spellCheck="false"
                                        placeholder="Add a more detailed description...">
                                    </textarea>
                                    {this.state.showEditDescriptionForm &&
                                        <div className="flex align-center" style={{ marginTop: '4px' }}>
                                            <button className="task-form-save-btn uppercase" onClick={(ev) => this.onSaveDescription(ev, task)}>save</button>
                                            <CloseIcon className="task-form-back-btn" onClick={this.closeUpdateDescriptionForm} />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="task-details-container-overall-options">
                            <div className="task-details-container-add-to-card-options container">
                                <h2>options</h2>
                                <div className="task-details-container-add-to-card-options flex column">
                                    <div className="task-details-container-add-to-card-options-btn flex align-center" onClick={ev => this.toggleChooseLabels(ev)}>
                                        <LabelOutlinedIcon />
                                        <p className="capitalize" >labels</p>
                                    </div>
                                    <div className="task-details-container-add-to-card-options-btn flex align-center relative" onClick={ev => this.toggleTaskBgColorHandler(ev)} >
                                        <ColorLensOutlinedIcon />
                                        <p className="capitalize">task color</p>
                                    </div>
                                    <div className="task-details-container-add-to-card-options-btn flex align-center" onClick={ev => this.toggleChooseMembers(ev)} >
                                        <PersonAddOutlinedIcon />
                                        <p className="capitalize">members</p>
                                    </div>
                                    <div className="task-details-container-add-to-card-options-btn flex align-center" onClick={ev => this.toggleTodos(ev)} >
                                        <AssignmentTurnedInOutlinedIcon />
                                        <p className="capitalize">check list</p>
                                    </div>
                                    <div className="task-details-container-add-to-card-options-btn flex align-center" onClick={ev => this.onToggleDueDate(ev)}>
                                        <EventOutlinedIcon />
                                        <p className="capitalize">due date</p>
                                    </div>

                                    <div className="task-details-container-add-to-card-options-btn flex align-center relative"
                                        onClick={ev => this.toggleUploadImageHandler(ev)}>
                                        <ImageOutlinedIcon />
                                        <p className="capitalize ">
                                            image
                                        </p>
                                        {this.state.toggleUploadImage &&
                                            <div className="upload-tasl-image__wraper absolute"
                                                onClick={ev => ev.stopPropagation()}>
                                                <input style={{ display: "none" }} type="file" id="upload-img-2" onChange={ev => this.uploadTaskImage(ev)}></input>
                                                <div className="upload-task-image__container absolute">
                                                    <label className="" htmlFor="upload-img-2">
                                                        <span className="text-center"> add file </span>
                                                    </label>
                                                    <div className="flex" style={{ marginTop: '5px' }}>
                                                        <input type='text'
                                                            placeholder='https://example.com/example.jpg'
                                                            value={this.state.imageLink}
                                                            onChange={ev => this.handleImageLinkChange(ev)} />
                                                        <button onClick={this.checkImageLink}>ok</button>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="task-details-container-actions-options container flex column ">
                                <h2>actions</h2>
                                <div className="task-details-container-actions-options-btn flex align-center" onClick={() => this.onDuplicateTask(column, task)}>
                                    <FileCopyOutlinedIcon />
                                    <p className="capitalize">duplicate</p>
                                </div>
                                <div className="task-details-container-actions-options-btn flex align-center" onClick={() => this.onDeleteTask(column, task)}>
                                    <DeleteOutlineOutlinedIcon />
                                    <p className="capitalize">delete</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}