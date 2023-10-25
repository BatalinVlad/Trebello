import React, { useState, useRef, useEffect } from 'react';
import MiniDetailsEditor from '../MiniDetailsEditor';
import ScreenFilter from '../ScreenFilter';
import utils from '../../services/utils';

const MiniImageDetails = (props) => {
    const textAreaRef = useRef(null);
    const imgContainerRef = useRef(null);

    const [title, setTitle] = useState('');
    const [imgHeight, setImgHeight] = useState(220);

    useEffect(() => {
        if (imgContainerRef.current) {
            setImgHeight(imgContainerRef.current.getBoundingClientRect().height);
        }
    }, []);

    const handleFocus = (ev) => {
        ev.target.select();
    }

    const emitChange = (ev) => {
        setTitle(ev.target.value);
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
        const msg = `${user} updated the task '${miniTask.task.title}' to '${title}'`;
        const notificationType = 'success';
        updateBoard(newBoard, msg, notificationType);
        onToggle();
    }

    const { task, boundingClientRect } = props.miniTask;
    const labelLen = task.labels.length;
    let height = boundingClientRect.height;
    let top = boundingClientRect.top;

    if (height + top > window.innerHeight) {
        height = (window.innerHeight - top - 50) > 253 ? window.innerHeight - top - 50 : 253;
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
                    maxHeight: height + 'px'
                }}
            >
                <img ref={imgContainerRef} title={task.id} style={{ objectFit: 'cover' }} alt="task" src={task.url} />
                <div className="task-container-labels flex">
                    {task.labels.map(label => {
                        return <div key={label} className={label + ' small-label'}></div>
                    })}
                </div>
                {task.title !== '' ?
                    <textarea
                        name="title"
                        className={"text-area" + (labelLen > 0 ? ' preview-label' : '')}
                        style={{
                            height: height - imgHeight + 'px',
                            position: 'relative',
                        }}
                        defaultValue={task.title}
                        ref={textAreaRef}
                        onFocus={handleFocus}
                        onInput={emitChange}
                        placeholder="Add a card title..."
                    >
                    </textarea> :
                    <textarea
                        name="title"
                        className={"text-area" + (labelLen > 0 ? ' preview-label' : '')}
                        style={{
                            padding: '5px',
                            borderTopLeftRadius: '0px',
                            borderTopRightRadius: '0px',
                            height: '20px',
                            position: 'relative',
                        }}
                        defaultValue={'add a title..'}
                        ref={textAreaRef}
                        onFocus={handleFocus}
                        onInput={emitChange}
                        placeholder="Add a card title..."
                    >
                    </textarea>
                }
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
            <button
                className="mini-details-save-btn"
                style={{
                    left: boundingClientRect.left + 'px',
                    top: (top + height + (task.title ? 10 : 32)) + 'px'
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
        </div >
    );
}

export default MiniImageDetails;
