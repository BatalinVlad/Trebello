import React, { useState } from 'react';

import MiniDetailsButton from './MiniDetailsButton';
import Labels from './Labels';
import DueDate from './DueDate';
import Members from './Members';

import utils from '../services/utils';

const MiniDetailsEditor = (props) => {
    const [onToggleLabels, setOnToggleLabels] = useState(false);
    const [onToggleDueDate, setOnToggleDueDate] = useState(false);
    const [onToggleMembers, setOnToggleMembers] = useState(false);

    const onToggleLabelsHandler = () => {
        setOnToggleLabels(!onToggleLabels);
    }

    const onToggleDueDateHandler = () => {
        setOnToggleDueDate(!onToggleDueDate);
    }

    const onToggleMembersHandler = () => {
        setOnToggleMembers(!onToggleMembers);
    }

    const onStopPropagationAndCloseOptions = (ev) => {
        ev && ev.stopPropagation();
        setOnToggleLabels(false);
        setOnToggleDueDate(false);
        setOnToggleMembers(false);
    }

    const onDuplicateTask = () => {
        const { task } = props.miniTask;
        const newTask = { ...task, id: utils.getRandomId(), labels: [...task.labels], todos: [...task.todos], taskTeamMembers: [...task.taskTeamMembers] };
        const newBoard = {
            ...props.board,
            tasks: {
                ...props.board.tasks,
                [newTask.id]: newTask
            }
        }
        newBoard.columns[props.miniTask.column.id].taskIds.push(newTask.id);
        const msg = `The task '${task.title}' was duplicated by ${props.user}`;
        const notificationType = 'success';
        props.updateBoard(newBoard, msg, notificationType);
        props.onToggle();
    }

    const onDelete = () => {
        const { miniTask } = props;
        const board = { ...props.board };
        const column = miniTask.column;
        const taskIds = column.taskIds;
        const task = board.tasks[miniTask.task.id];
        const idx = taskIds.findIndex(taskId => taskId === miniTask.task.id);
        taskIds.splice(idx, 1);
        delete board.tasks[miniTask.task.id];
        const msg = `'${task.title}' was deleted by ${props.user}`;
        const notificationType = 'danger';
        props.updateBoard(board, msg, notificationType);
        props.onToggle();
    }

    const { miniTask } = props;
    const { boundingClientRect } = miniTask;
    let top = boundingClientRect.top;

    if (top + 180 > window.innerHeight) {
        top = window.innerHeight - 180;
    }

    return (
        <div
            className="mini-details-editor flex column"
            style={{
                left: (boundingClientRect.left + 265) + 'px',
                top: (top - 5) + 'px'
            }}
        >
            <MiniDetailsButton text="🖊️ Edit Labels" onClick={() => {
                onStopPropagationAndCloseOptions();
                onToggleLabelsHandler();
            }} />
            {onToggleLabels ? <Labels
                closeAll={onStopPropagationAndCloseOptions}
                miniTask={miniTask}
                task={miniTask.task}
                toggleChooseLabels={onToggleLabelsHandler}
                board={props.board}
                updateBoard={props.updateBoard}
            /> : ''}
            <MiniDetailsButton text="🎭 Change Members" onClick={() => {
                onStopPropagationAndCloseOptions();
                onToggleMembersHandler();
            }} />
            {onToggleMembers ? <Members
                closeAll={onStopPropagationAndCloseOptions}
                pos={true}
                task={miniTask.task}
                board={props.board}
                updateBoard={props.updateBoard}
                toggleChooseMembers={onToggleMembersHandler}
            /> : ''}
            {onToggleDueDate ? <DueDate
                closeAll={onStopPropagationAndCloseOptions}
                task={miniTask.task}
                board={props.board}
                updateBoard={props.updateBoard}
                user={props.user}
            /> : ''}
            <MiniDetailsButton text="⎘ Duplicate Task" onClick={onDuplicateTask} />
            <MiniDetailsButton text="🗑️ Delete Task" onClick={onDelete} />
            <button
                className="mini-details-save-btn"
                onClick={props.onSave}
            >SAVE</button>
        </div>
    );
}

export default MiniDetailsEditor;
