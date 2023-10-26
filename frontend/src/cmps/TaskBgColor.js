import React, { useState , useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const TaskBgColor = ({ board, task, updateBoard, user, closeAll }) => {
    const [chosenColor, setChosenColor] = useState(task.bgColor || 'bgTaskWhite');

    const changeTaskBgColor = (ev) => {
        const colorChanged = ev.target.getAttribute('value');
        if (chosenColor === colorChanged) return;

        const msg = `User: ${user} has changed Task: '${task.title}' background from ${chosenColor} to ${colorChanged}`;
        const notificationType = 'success';
        onSave(msg, notificationType, colorChanged);
        setChosenColor(colorChanged);
    }

    const onSave = (msg, notificationType, color) => {
        const newTask = { ...task, bgColor: color };
        const newBoard = {
            ...board,
            tasks: {
                ...board.tasks,
                [newTask.id]: newTask
            }
        };
        updateBoard(newBoard, msg, notificationType);
    }

    const isColorChosen = (colorValue) => {
        return chosenColor === colorValue ? 'chosen' : '';
    };

    return (
        <div className="change-bgcolor-container absolute " onClick={ev => ev.stopPropagation()}>
            <div className='fill-with flex justify-end'>
                <CloseIcon onClick={ev => closeAll(ev)} style={{ color: 'black' }} />
            </div>
            <p className='text-center'>choose background color</p>
            <div className="choose-color flex justify-center">
                <span className={`color ${isColorChosen('bgTaskWhite')}`} style={{ backgroundColor: 'white' }} value='bgTaskWhite' onClick={ev => changeTaskBgColor(ev)}></span>
                <span className={`color ${isColorChosen('bgTaskGreen')}`} style={{ backgroundColor: '#1d976c' }} value='bgTaskGreen' onClick={ev => changeTaskBgColor(ev)}></span>
                <span className={`color ${isColorChosen('bgTaskYellow')}`} style={{ backgroundColor: '#fffc00' }} value='bgTaskYellow' onClick={ev => changeTaskBgColor(ev)}></span>
                <span className={`color ${isColorChosen('bgTaskOrange')}`} style={{ backgroundColor: '#ff8008' }} value='bgTaskOrange' onClick={ev => changeTaskBgColor(ev)}></span>
                <span className={`color ${isColorChosen('bgTaskRed')}`} style={{ backgroundColor: '#eb3349' }} value='bgTaskRed' onClick={ev => changeTaskBgColor(ev)}></span>
                <span className={`color ${isColorChosen('bgTaskBlue')}`} style={{ backgroundColor: '#1fa2ff' }} value='bgTaskBlue' onClick={ev => changeTaskBgColor(ev)}></span>
            </div>
        </div>
    );
}

export default TaskBgColor;
