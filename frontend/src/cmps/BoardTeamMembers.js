import React, { useState, useEffect } from 'react';
import utils from '../services/utils';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

const BoardTeamMembers = (props) => {
    const [currentBoardMembers, setCurrentBoardMembers] = useState([]);

    useEffect(() => {
        setCurrentBoardMembers(props.board.teamMembers);
    }, [props.board.teamMembers]);

    const isUserAssigned = (user) => {
        return currentBoardMembers.some(boardMember => boardMember._id === user._id);
    };

    const updateTeamMembers = (user) => {
        const board = props.board;
        const teamMembers = board.teamMembers;
        let msg = '';
        let notificationType = '';

        if (teamMembers.find(teamMember => teamMember._id === user._id)) {
            const idx = teamMembers.findIndex(teamMember => teamMember._id === user._id);
            teamMembers.splice(idx, 1);
            msg = `${user.username} was removed from this board`;
            notificationType = 'danger';
        } else {
            teamMembers.push(user);
            msg = `${user.username} was added to this board`;
            notificationType = 'success';
        }

        setCurrentBoardMembers([...teamMembers]);
        props.updateBoard(board, msg, notificationType);
    };

    const onStopPropagation = (ev) => {
        ev.stopPropagation();
    };

    return (
        <div
            className="board-team-members-container text-center column"
            onClick={(ev) => onStopPropagation(ev)}
            style={{
                background: `${props.dominantColor.slice(0, -4) + '.9)'}`,
                backdropFilter: 'blur(5px)',
            }}
        >
            <div className="members-onboard flex column">
                <h2 className='fs14 text-center' style={{ color: props.isDarkBackground ? 'white' : 'black' }}>
                    assigned members to the board
                </h2>
                {props.users.map(user => (
                    <div
                        key={user._id}
                        className={`team-member flex align-center space-between ${isUserAssigned(user) ? 'assigned' : ''}`}
                        onClick={() => updateTeamMembers(user)}
                    >
                        <div className='flex align-center'>
                            <div className="team-member-icon-wrapper flex center" style={{ background: user.color, boxShadow: '0px 0px 1px 0px #000000bf' }}>
                                <div className="team-member-icon">
                                    <p className="uppercase" style={{ color: '#172b4d' }}>
                                        {utils.createUserIcon(user.firstName, user.lastName)}
                                    </p>
                                </div>
                            </div>
                            <span className="capitalize" style={{ color: props.isDarkBackground ? 'white' : 'black' }}>
                                {user.firstName} {user.lastName}
                            </span>
                        </div>
                        {isUserAssigned(user) &&
                            <CheckCircleOutlineRoundedIcon
                                style={{ color: '#969696' }}
                            />
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BoardTeamMembers;
