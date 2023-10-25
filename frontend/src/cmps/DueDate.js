import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DueDate = (props) => {
    console.log(props);
    const [dueDate, setDueDate] = useState(null);

    useEffect(() => {
        setDueDate(props.task.dueDate ? new Date(props.task.dueDate) : new Date());
    }, [props.task.dueDate, setDueDate])

    const handleChange = (date) => {
        saveTask(date);
    };

    const saveTask = (date) => {
        const newTask = { ...props.task, dueDate: date.getTime() };
        const newBoard = {
            ...props.board,
            tasks: {
                ...props.board.tasks,
                [newTask.id]: newTask,
            },
        };
        const msg = `${props.user} changed the due date for task '${props.task.title}'`;
        const notificationType = 'success';
        props.updateBoard(newBoard, msg, notificationType);
    };

    return (
        <div className="duedate-edit flex column" onClick={(ev) => ev.stopPropagation()}>
            <DatePicker
                selected={dueDate}
                onChange={handleChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                popperModifiers={{
                    flip: { behavior: ['bottom'] },
                    preventOverflow: { enabled: false },
                }}
            />
        </div>
    );
};

export default DueDate;
