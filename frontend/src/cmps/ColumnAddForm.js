import React, { useState, useEffect, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import utils from '../services/utils';
import { updateBoard } from '../actions/BoardActions';
import { useDispatch } from 'react-redux';

export default function ColumnAddForm(props) {
    const dispatch = useDispatch();

    const nameInputRef = useRef(null);

    const [column, setColumn] = useState({
        id: utils.getRandomId(),
        title: '',
        taskIds: []
    });


    const setFormDataForEdit = () => {
        if (props.column) {
            const columnData = {
                id: props.column.id,
                title: props.column.title,
                taskIds: props.column.taskIds
            };
            setColumn(columnData);
        }
    };

    const inputChange = (ev) => {
        const fieldName = ev.target.name;
        const value = ev.target.value;
        setColumn((prevColumn) => ({
            ...prevColumn,
            [fieldName]: value
        }));
    };

    const saveColumn = async (ev) => {
        ev.preventDefault();
        const title = column.title !== '' ? column.title : 'no title';
        column.title = title;
        const newBoard = {
            ...props.board,
            columns: {
                ...props.board.columns,
                [column.id]: column
            }
        };
        const id = column.id;
        const columnOrder = newBoard.columnOrder;
        if (!columnOrder.includes(id)) {
            columnOrder.push(id);
        }
        const msg = `'${column.title}' was added by ` + props.user;
        const notificationType = 'success';
        dispatch(updateBoard(newBoard, msg, notificationType));
        props.toggleAddForm();
    };

    useEffect(() => {
        setFormDataForEdit();
        nameInputRef.current.focus();

    }, [props.column, setFormDataForEdit]);

    useEffect(() => {
        nameInputRef.current.focus();
    }, [])

    return (
        <form className="add-column-form-container flex column space-between" onSubmit={saveColumn}>
            <input
                ref={nameInputRef}
                type="text"
                placeholder="Enter list title..."
                name="title"
                onChange={inputChange}
                value={column.title}
            />
            <div className="save-btn-container flex">
                <button className="add-column-save-btn capitalize" variant="contained">
                    add list
                </button>
                <CloseIcon className="add-column-back-to-board flex align-center" onClick={props.toggleAddForm} />
            </div>
        </form>
    );
}
