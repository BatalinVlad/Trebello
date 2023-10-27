import React, { useState, useEffect } from 'react';
import utils from '../services/utils';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

const Members = (props) => {
  const [choosenMembers, setChoosenMembers] = useState([]);
  const [availableMembers, setAvailableMembers] = useState([]);

  useEffect(() => {
    // check if those who asigned are still on board
    const checkedInMembers = checkChoosenMembers(props.task.taskTeamMembers);
    // already asigned
    setChoosenMembers(checkedInMembers);
    // from all team members find the ones that are available  to asign
    setAvailableMembers(props.board.teamMembers.filter(currMember => !choosenMembers.find(taskMember => taskMember._id === currMember._id)));
  }, [props.task.taskTeamMembers, props.board.teamMembers, setChoosenMembers, setAvailableMembers]);

  const checkChoosenMembers = (membersToCheck) => {
    const checkedInMembers = props.board.teamMembers.filter(currMember => membersToCheck.find(memberToCheck => memberToCheck._id === currMember._id));
    return checkedInMembers;
  }
  

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
      <div className='close-icon fill-with flex justify-end'>
        <CloseIcon onClick={ev => props.closeAll(ev)} style={{ paddingRight: '4px' }} />
      </div>
      <div className="members-container-asign-members-wrapper flex">
        <div className="members-container-asign-members flex column fill-width" style={{ paddingRight: '2px' }}>
          {props.board.teamMembers.map(member => (
            <div
              key={member._id}
              className={`team-member flex align-center space-between ${choosenMembers.some(assignedMember => assignedMember._id === member._id) ? 'assigned' : ''}`}
              onClick={() => updateChoosenMembers(member)}
            >
              <div className='flex align-center'>
                <div className="team-member-icon-wrapper flex align-center justify-center" style={{ background: member.color, color: '#172b4d', boxShadow: '0px 0px 1px 0px #000000bf' }}>
                  <div className="team-member-icon">
                    <p className='uppercase' style={{ color: '#172b4d' }}>{utils.createUserIcon(member.firstName, member.lastName)}</p>
                  </div>
                </div>
                <p>{member.firstName} {member.lastName}</p>
              </div>
              {choosenMembers.some(assignedMember => assignedMember._id === member._id) &&
                <CheckCircleOutlineRoundedIcon
                  style={{ color: '#969696' }}
                />
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Members;
