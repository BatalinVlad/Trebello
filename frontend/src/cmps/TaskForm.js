import React, { useState, useEffect, useRef } from 'react';

import CloseIcon from '@mui/icons-material/Close';

import utils from '../services/utils'

import { useDispatch } from 'react-redux';
import { updateBoard } from '../actions/BoardActions';

const TaskForm = props => {

    const [task, setTask] = useState({
        id: utils.getRandomId(),
        title: '',
        createdAt: Date.now(),
        dueDate: '',
        importance: '',
        description: '',
        type: 'text',
        labels: [],
        todos: [],
        taskTeamMembers: [],
    });
    const [edit, setEdit] = useState(false);

    const nameInputRef = useRef();
    const prevTaskRef = useRef(props.task);

    const dispatch = useDispatch();

    useEffect(() => {
        nameInputRef.current.focus();
    }, []);

    useEffect(() => {
        if (prevTaskRef.current) {
            setEdit(true);
        }
        if (prevTaskRef.current !== props.task) {
            // console.log('prev props changed');
            prevTaskRef.current = props.task;
            // saveTask();
        }
    }, [props.task]);

    const inputChange = (ev) => {
        const fieldName = ev.target.name;
        const value = ev.target.value;
        setTask((prevState) => ({
            ...prevState,
            [fieldName]: value,
        }));
    };

    const save = (ev) => {
        ev.preventDefault();
        checkIfUrlAndSave(task.title);
    };

    const checkIfUrlAndSave = (url) => {
        const videoIdMatch = url.match(/(?:\?v=|\/embed\/|\/watch\?v=|\/\d{11}\/|\/\d{11}$)([a-zA-Z0-9_-]{11})/);
        const imgREGEX = /.(jpg|jpeg|png|gif)\/?$/;

        if (videoIdMatch) {
            const videoId = videoIdMatch[1];
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
            saveTask({ ...task, title: '', type: 'video', url: embedUrl });
            console.log(embedUrl);
        } else if (url.match(imgREGEX)) {
            saveTask({ ...task, title: '', type: 'image', url });
        } else {
            saveTask()
        }

    };

    const saveTask = (newTask = null) => {
        const taskId = newTask ? newTask.id : task.id;
        const newBoard = {
            ...props.board,
            tasks: {
                ...props.board.tasks,
                [taskId]: newTask || task,
            },
        };

        const column = props.column;
        const id = task.id;
        if (!column.taskIds.includes(id)) column.taskIds.push(id);
        const msg = !edit
            ? `The task '${task.title}' was added by ${props.user}`
            : `${props.user} edited the task '${task.title}'`;
        const notificationType = 'success';
        dispatch(updateBoard(newBoard, msg, notificationType));
        props.closeUpdateForm();
        if (props.toggleUpdateForm) props.toggleUpdateForm();
        if (props.toggleTaskDetails) props.toggleTaskDetails();
    };

    const textAreaAdjust = (ev) => {
        ev.target.style.height = '1px';
        ev.target.style.height = 25 + ev.target.scrollHeight + 'px';
    };

    return (
        <div className="task-form" >
            <form onSubmit={save} onClick={ev => ev.stopPropagation()}>
                <div className="flex column" >

                    <textarea type="text"
                        onKeyUp={textAreaAdjust}
                        placeholder="Enter a title for this card..."
                        name="title"
                        ref={nameInputRef}
                        onChange={inputChange} value={task.title} />
                    <div className="save-btn-container flex align-center">
                        <button className="task-form-save-btn save capitalize">add card</button>
                        <CloseIcon className="task-form-back-btn" onClick={(ev) => { ev.stopPropagation(); props.closeUpdateForm() }} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default TaskForm
