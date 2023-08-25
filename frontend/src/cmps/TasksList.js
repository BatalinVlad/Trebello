import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
// import NaturalDragAnimation from 'natural-drag-animation-rbdnd';

import DynamicComponent from './dynamics/DynamicComponent';

const TasksList = props => {
    const [state, setState] = useState({
        showAddForm: false,
        currTaskId: '',
        onTaskId: '',
        showTaskDetails: false,
    })


    const showEditBtn = (id) => {
        setState({ showEditBtn: true, onTaskId: id })
    }

    const hideEditBtn = () => {
        setState({ showEditBtn: false })
    }


    return (
        <section className={"task-list"}
            {...props.provided.droppableProps}
            ref={props.innerRef}
        >
            {props.tasks.map((task, idx) => (
                <div key={task.id} className="task-list-container">
                    <Draggable draggableId={task.id} index={idx}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                onClick={_ => props.toggleTaskDetails({ id: task.id, column: props.column })}
                                onMouseEnter={() => showEditBtn(task.id)}
                                onMouseLeave={() => hideEditBtn()}
                            >
                                <DynamicComponent
                                    provided={provided}
                                    innerRef={provided.innerRef}
                                    task={task}
                                    column={props.column}
                                    onTaskId={state.onTaskId}
                                    showEditBtn={state.showEditBtn}
                                    toggleMiniDetails={props.toggleMiniDetails}
                                    user={props.user}
                                >
                                </DynamicComponent>
                            </div>
                        )}
                    </Draggable>
                </div>
            ))
            }
            {props.provided.placeholder}
        </section>
    )
}

export default TasksList