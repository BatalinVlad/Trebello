import React, { useState, useRef, useEffect } from 'react';
import MiniDetailsEditor from '../MiniDetailsEditor';
import ScreenFilter from '../ScreenFilter';

const MiniTextDetails = (props) => {
    const textAreaRef = useRef(null);

    const [title, setTitle] = useState('');

    const handleFocus = (ev) => {
        ev.target.select();
    }

    const emitChange = (ev) => {
        const targetValue = ev.target.value;
        setTitle(targetValue);
    }

    const onSave = () => {
        const { miniTask, board, user, updateBoard, onToggle } = props;
        const newTask = { ...miniTask.task, title: title ? title : miniTask.task.title };
        const newBoard = {
            ...board,
            tasks: {
                ...board.tasks,
                [newTask.id]: newTask
            }
        }
        const msg = `${user} changed the title of the task '${miniTask.task.title}' to '${title}'`;
        const notificationType = 'success';
        updateBoard(newBoard, msg, notificationType);
        onToggle();
    }

    const { task, boundingClientRect } = props.miniTask;
    const labelLen = task.labels.length;
    let height = boundingClientRect.height;
    let top = boundingClientRect.top;

    if (height + top > window.innerHeight) {
        height = (window.innerHeight - top - 50) > 248 ? window.innerHeight - top - 50 : 248;
    }
    if (boundingClientRect.top > (window.innerHeight - (window.innerHeight / 4))) {
        top = window.innerHeight - height - 50;
    }

    return (
        <div className="mini-details-container">
            <div
                className="mini-details"
                style={{
                    left: boundingClientRect.left + 'px',
                    top: top + 'px',
                    height: height + 'px'
                }}
            >
                <div className="task-container-labels flex">
                    {task.labels.map(label => {
                        return <div key={label} className={label + ' small-label'}></div>
                    })
                    }
                </div>
                <textarea
                    name="title"
                    className={"text-area" + (labelLen > 0 ? ' preview-label' : '')}
                    defaultValue={task.title}
                    ref={textAreaRef}
                    onFocus={handleFocus}
                    onInput={emitChange}
                    placeholder="Add a card title..."
                >
                </textarea>
            </div>
            <button
                className="mini-details-save-btn"
                style={{
                    left: boundingClientRect.left + 'px',
                    top: (top + height + 10) + 'px'
                }}
                onClick={onSave}
            >SAVE</button>
            <MiniDetailsEditor
                user={props.user}
                miniTask={props.miniTask}
                board={props.board}
                updateBoard={props.updateBoard}
                onToggle={props.onToggle}
            />
            <ScreenFilter onToggle={props.onToggle} />
        </div>
    );
}

export default MiniTextDetails;
