import React, { useState, useRef } from 'react';
import MiniDetailsEditor from '../MiniDetailsEditor';
import ScreenFilter from '../ScreenFilter';
import utils from '../../services/utils';

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
                <div className="team-members-container z4">
                    <div className="flex justify-end">
                        {(task.taskTeamMembers.slice(0, 3).map((member) => {
                            return <div key={member._id} className="team-member-icon-wrapper flex align-center" style={{ background: member.color, color: '#172b4d', boxShadow: '0px 0px 1px 0px #000000bf' }} >
                                <div className="team-member-icon">
                                    <p className="flex align-center uppercase" style={{ color: '#172b4d' }}>
                                        {utils.createUserIcon(member.firstName,
                                            member.lastName)}
                                    </p>
                                </div>
                            </div>
                        }))}
                        {
                            task.taskTeamMembers.length > 3 &&
                            <div className="team-member-icon-wrapper flex align-center" style={{ background: '#dfe1e6', color: '#172b4d', boxShadow: '0px 0px 1px 0px #000000bf' }} >
                                <div className="team-member-icon">
                                    <p className="flex align-center uppercase" style={{ color: '#172b4d' }}>
                                        {`+${task.taskTeamMembers.length - 3}`}
                                    </p>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
            <MiniDetailsEditor
                user={props.user}
                miniTask={props.miniTask}
                board={props.board}
                updateBoard={props.updateBoard}
                onToggle={props.onToggle}
                onSave={onSave}
            />
            <ScreenFilter onToggle={props.onToggle} />
        </div>
    );
}

export default MiniTextDetails;
