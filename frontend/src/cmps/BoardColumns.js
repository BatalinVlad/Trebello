import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import NaturalDragAnimation from 'natural-drag-animation-rbdnd';

import TopMenuOptions from './TopMenuOptions'
import TasksList from './TasksList';
import TaskForm from '../cmps/TaskForm'

const BoardColumns = props => {

    const [title, setTitle] = useState('');

    const onDelete = (id) => {
        const board = { ...props.board };
        const columnOrder = board.columnOrder;
        const column = board.columns[id];
        for (const taskId of column.taskIds) {
            for (const taskKey in board.tasks) {
                if (taskId === taskKey) {
                    delete board.tasks[taskKey];
                }
            }
        }
        delete board.columns[id];
        const idx = columnOrder.findIndex(column => column === id);
        columnOrder.splice(idx, 1);
        const msg = `'${column.title}' was deleted by ${props.user}`;
        const notificationType = 'danger';
        props.updateBoard(board, msg, notificationType);
    }

    const onDragEnd = result => {
        const { destination, source, draggableId, type } = result;

        if (!destination) { //outside of the draggable container...
            return;
        };

        if (destination.droppableId === source.droppableId && // same place
            destination.index === source.index) {
            return;
        };

        if (type === 'column') {
            const newColumnOrder = props.board.columnOrder.slice();
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);
            const columnTitle = props.board.columns[draggableId].title;
            const newBoard = {
                ...props.board,
                columnOrder: newColumnOrder
            }
            const msg = `'${columnTitle}' was moved by ${props.user}`;
            const notificationType = 'success';
            return props.updateBoard(newBoard, msg, notificationType);
        };

        const start = props.board.columns[source.droppableId];
        const finish = props.board.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = start.taskIds.slice();
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
            const newColumn = {
                ...start,
                taskIds: newTaskIds
            };
            const newBoard = {
                ...props.board,
                columns: {
                    ...props.board.columns,
                    [newColumn.id]: newColumn
                }
            };
            const taskTitle = props.board.tasks[draggableId].title;
            const msg = `${props.user} changed the position of the task '${taskTitle}'`;
            const notificationType = 'success';
            return props.updateBoard(newBoard, msg, notificationType);
        };

        const startTaskIds = start.taskIds.slice();
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds
        };

        const finishTaskIds = finish.taskIds.slice();
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        };

        const newBoard = {
            ...props.board,
            columns: {
                ...props.board.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };
        const taskTitle = props.board.tasks[draggableId].title;
        const msg = `${props.user} moved the task '${taskTitle}' from '${newStart.title}' to '${newFinish.title}'`;
        const notificationType = 'success';
        props.updateBoard(newBoard, msg, notificationType);
    }

    const setColumnName = (columnId) => {
        const columnTitle = props.board.columns[columnId].title;
        setTitle(columnTitle);
    }

    const emitChange = (ev) => {
        setTitle(ev.target.innerText);
    }

    const saveColumnName = (columnId, title) => {
        const columnTitle = props.board.columns[columnId].title;
        if (columnTitle === title) return;

        const updatedBoard = { ...props.board };
        updatedBoard.columns[columnId].title = title;

        const msg = `${props.user} changed the name of '${columnTitle}' to '${title}'`;
        const notificationType = 'success';

        props.updateBoard(updatedBoard, msg, notificationType);
    }

    const addCardText = (column) => {
        return (column.taskIds.length === 0) ? 'Add a card' : 'Add another card';
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-columns" direction="horizontal" type="column">
                {(provided) => (
                    <div
                        className="board-columns flex"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {props.board.columnOrder.map((columnKey, idx) => {
                            const column = props.board.columns[columnKey];
                            const tasks = column.taskIds.map(currId => props.board.tasks[currId]);

                            return (
                                <Draggable
                                    key={column.id}
                                    draggableId={columnKey}
                                    index={idx}
                                >
                                    {(provided) => (
                                        <div
                                            className="board-columns-item"
                                            {...provided.draggableProps}
                                            ref={provided.innerRef}
                                        >
                                            <div className="board-columns-item-header flex align-center space-between"
                                                {...provided.dragHandleProps}
                                            >
                                                <div className="board-columns-item-header-h2-wrapper">
                                                    <h2
                                                        contentEditable={true}
                                                        spellCheck="false"
                                                        onFocus={() => setColumnName(column.id)}
                                                        onInput={(ev) => emitChange(ev)}
                                                        onBlur={() => saveColumnName(column.id, title)}
                                                        suppressContentEditableWarning={true}
                                                    >
                                                        {column.title}
                                                    </h2>
                                                </div>
                                                <div
                                                    className="board-columns-item-header-menu-btn-icon"
                                                    onClick={(ev) => {
                                                        ev.stopPropagation();
                                                        props.openEditColumn(column.id);
                                                    }}
                                                >
                                                    <p>...</p>
                                                </div>
                                            </div>
                                            {props.showTopMenuOptions && props.currColumnId === column.id &&
                                                <TopMenuOptions
                                                    onDelete={onDelete}
                                                    column={column}
                                                    board={props.board}
                                                    updateBoard={props.updateBoard}
                                                    toggleTopMenuOptions={props.closeEditColumn}
                                                    user={props.user}
                                                />
                                            }
                                            <Droppable droppableId={column.id} type="task">
                                                {(provided, snapshot) => {
                                                    return <TasksList
                                                        snapshot={snapshot}
                                                        provided={provided}
                                                        innerRef={provided.innerRef}
                                                        board={props.board}
                                                        tasks={tasks}
                                                        column={column}
                                                        toggleTaskDetails={props.toggleTaskDetails}
                                                        updateBoard={props.updateBoard}
                                                        toggleMiniDetails={props.toggleMiniDetails}
                                                        user={props.user}
                                                    />
                                                }}
                                            </Droppable>
                                            {!props.showAddForm || props.currColumnId !== column.id ? (
                                                <div className="task-list-footer flex align-center">
                                                    <div
                                                        className="task-list-footer-add-task fill-width"
                                                        onClick={(ev) => {
                                                            ev.stopPropagation();
                                                            props.openAddForm(column.id);
                                                        }}
                                                    >
                                                        <span className="add-icon">+</span>
                                                        {addCardText(column)}
                                                    </div>
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                            {props.showAddForm && props.currColumnId === column.id && (
                                                <TaskForm
                                                    user={props.user}
                                                    board={props.board}
                                                    column={column}
                                                    closeUpdateForm={props.closeAddForm}
                                                    updateBoard={props.updateBoard}
                                                />
                                            )}
                                        </div>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}


export default BoardColumns