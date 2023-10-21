import React, { useState, useEffect } from 'react';
import utils from '../services/utils';

const Members = (props) => {
  const [choosenMembers, setChoosenMembers] = useState([]);
  const [availableMembers, setAvailableMembers] = useState([]);

  useEffect(() => {
    setNewState();
  }, [props.task]);

  const setNewState = () => {
    setChoosenMembers(props.task.taskTeamMembers);
    setAvailableMembers(props.board.teamMembers.filter(currMember => !choosenMembers.find(taskMember => taskMember._id === currMember._id)));
  };

  const updateChoosenMembers = (teamMember) => {
    let msg = '';
    let notificationType = '';
    const memberIdx = choosenMembers.findIndex(currMember => currMember._id === teamMember._id);

    if (memberIdx >= 0) {
      choosenMembers.splice(memberIdx, 1);
      msg = `${teamMember.username} was released from the task '${props.task.title}'`;
      notificationType = 'danger';
    } else {
      choosenMembers.push(teamMember);
      msg = `${teamMember.username} was assigned to the task '${props.task.title}'`;
      notificationType = 'success';
    }
    setChoosenMembers([...choosenMembers]);
    setAvailableMembers([...availableMembers]);
    onSave(msg, notificationType);
  };

  const onSave = (msg, notificationType) => {
    const newTask = { ...props.task, taskTeamMembers: choosenMembers };
    const newBoard = {
      ...props.board,
      tasks: {
        ...props.board.tasks,
        [newTask.id]: newTask
      }
    };
    props.updateBoard(newBoard, msg, notificationType);
  };

  const onStopPropagation = (ev) => {
    ev.stopPropagation();
  };

  return (
    <div className="members-container text-center column" onClick={(ev) => onStopPropagation(ev)}>
      <p className="uppercase">assigned members</p>
      <hr />

      <div className="members-container-asign-members-wrapper flex">
        <div className="members-container-asign-members flex column fill-width">
          {props.task.taskTeamMembers.map(member => (
            <div key={member._id} className="team-member flex" onClick={() => updateChoosenMembers(member)}>
              <div className="team-member-icon-wrapper flex align-center justify-center" style={{ backgroundColor: '#dfe1e6', color: '#172b4d' }}>
                <div className="team-member-icon">
                  <p>{utils.createUserIcon(member.firstName, member.lastName)}</p>
                </div>
              </div>
              <p>{member.firstName} {member.lastName}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="add-team-members-wrapper flex column">
        <p className="uppercase">add a team member</p>
        <div className="add-team-members flex column">
          {availableMembers.map(teamMember => (
            <div key={teamMember._id} className="team-member flex align-center" onClick={() => updateChoosenMembers(teamMember)}>
              <div className="team-member-icon-wrapper flex align-center justify-center" style={{ backgroundColor: '#dfe1e6', color: '#172b4d' }}>
                <div className="team-member-icon">
                  <p>{utils.createUserIcon(teamMember.firstName, teamMember.lastName)}</p>
                </div>
              </div>
              <p>{teamMember.firstName} {teamMember.lastName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Members;
