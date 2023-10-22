import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

const TaskBgColor = ({ board, task, updateBoard, user, closeAll }) => {
    const [chosenColor, setChosenColor] = useState('')

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
                <CloseIcon onClick={ev => closeAll(ev)}  style={{ color: 'black' }} />
            </div>
            <p>choose background color</p>
            <div className="choose-color flex justify-center">
                <span className='color' style={{ backgroundColor: 'white' }} value='bgTaskWhite' onClick={ev => changeTaskBgColor(ev)}></span>
                <span className='color' style={{ backgroundColor: '#1d976c' }} value='bgTaskGreen' onClick={ev => changeTaskBgColor(ev)}></span>
                <span className='color' style={{ backgroundColor: '#fffc00' }} value='bgTaskYellow' onClick={ev => changeTaskBgColor(ev)}></span>
                <span className='color' style={{ backgroundColor: '#ff8008' }} value='bgTaskOrange' onClick={ev => changeTaskBgColor(ev)}></span>
                <span className='color' style={{ backgroundColor: '#eb3349' }} value='bgTaskRed' onClick={ev => changeTaskBgColor(ev)}></span>
                <span className='color' style={{ backgroundColor: '#1fa2ff' }} value='bgTaskBlue' onClick={ev => changeTaskBgColor(ev)}></span>
            </div>
        </div>
    )
}

export default TaskBgColor
