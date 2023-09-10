import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

const TaskBgColor = ({ board, task, updateBoard, user, toggleTaskBgColorHandler }) => {
    const [chosenColor, setChosenColor] = useState('bgTaskWhite')

    const changeTaskBgColor = (ev) => {
        const colorChnaged = ev.target.getAttribute('value');
        if (chosenColor === colorChnaged) return;
        const msg = `User: ${user} has changed Task: '${task.title}' background from ${chosenColor} to ${colorChnaged}`;
        const notificationType = 'success';
        onSave(msg , notificationType , colorChnaged);
        setChosenColor(colorChnaged)
    }

    const onSave = (msg, notificationType , color) => {
        const newTask = { ...task, bgColor: color };
        const newBoard = {
            ...board,
            tasks: {
                ...board.tasks,
                [newTask.id]: newTask
            }
        }
        updateBoard(newBoard, msg, notificationType);
    }

    return (
        <div className="change-bgcolor-container absolute " onClick={ev => ev.stopPropagation()}>
            <div className='fill-with flex justify-end'>
                <CloseIcon onClick={toggleTaskBgColorHandler} style={{ color: 'black' }} />
            </div>
            <p>choose background color</p>
            <div className="choose-color flex justify-center">
                <span className='color' style={{ backgroundColor: 'white' }} value='bgTaskWhite' onClick={ev => changeTaskBgColor(ev)}></span>
                <span className='color' style={{ backgroundColor: 'green' }} value='bgTaskGreen' onClick={ev => changeTaskBgColor(ev)}></span>
                <span className='color' style={{ backgroundColor: 'yellow' }} value='bgTaskYellow' onClick={ev => changeTaskBgColor(ev)}></span>
                <span className='color' style={{ backgroundColor: 'orange' }} value='bgTaskOrange' onClick={ev => changeTaskBgColor(ev)}></span>
                <span className='color' style={{ backgroundColor: 'red' }} value='bgTaskRed' onClick={ev => changeTaskBgColor(ev)}></span>
                <span className='color' style={{ backgroundColor: 'blue' }} value='bgTaskBlue' onClick={ev => changeTaskBgColor(ev)}></span>
            </div>
        </div>
    )
}

export default TaskBgColor
