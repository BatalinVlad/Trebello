import React, { useRef } from "react";
import CreateIcon from '@mui/icons-material/Create';
import SubjectIcon from '@mui/icons-material/Subject';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import utils from '../../services/utils';

const TaskPreview = (props) => {
    const taskContainer = useRef(null);

    const toggleMiniDetails = (ev) => {
        ev.stopPropagation();
        const miniTask = {
            task: props.task,
            boundingClientRect: taskContainer.current.getBoundingClientRect(),
            previewType: props.task.type,
            column: props.column
        };
        props.toggleMiniDetails(miniTask);
    };

    const { task, provided, innerRef, showEditBtn, onTaskId } = props;

    return (
        <section ref={taskContainer}>
            <div className={`task-container ${task.bgColor ? task.bgColor : 'bgTaskWhite'}`}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={innerRef}
            >
                {task.url &&
                    <img title={task.id} alt="task" src={task.url}
                        style={{ borderBottomLeftRadius: task.title !== '' && '0px', borderBottomRightRadius: task.title !== '' && '0px' }} />
                }
                {task.labels.length > 0 &&
                    <div className="task-container-labels flex wrap">
                        {task.labels.map(label => {
                            return <div key={label} className={label + ' small-label'}>
                            </div>
                        })}
                    </div>
                }
                <p className="task-container-title flex align-center">{task.title !== '' ? task.title : 'no title'}</p>
                {(showEditBtn && (onTaskId === task.id)) &&
                    <CreateIcon className="task-container-open-menu"
                        onClick={e => toggleMiniDetails(e)} />
                }

                <div className="bottom-container flex row" style={(task.taskTeamMembers.length !== 0) ? { minHeight: '35px' } : null}>
                    {(task.description !== '') &&
                        <div className="flex center" style={{ paddingBottom: '3px' }}>
                            <SubjectIcon />
                        </div>
                    }

                    {(task.todos.length > 0) &&
                        <div className="flex center" style={{ paddingBottom: '3px' }}>
                            <div className="flex align-center">
                                <CheckBoxIcon />
                                <p>{task.todosDone + '/' + task.todos.length}</p>
                            </div>
                        </div>
                    }
                    {
                        (task.dueDate) &&
                        <div className="flex center" style={{ paddingBottom: '3px' }}>
                            <CalendarMonthIcon />
                            <p style={{paddingTop:'8px' , fontSize:'12px'}}>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        </div>
                    }
                    <div className="team-members-container">
                        <div className="flex justify-end">
                            {(task.taskTeamMembers.slice(0, 3).map(member => {
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
            </div>
        </section>
    );
};

export default TaskPreview;
