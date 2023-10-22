import React, { Component } from 'react';

import utils from '../services/utils'

export default class BoardTeamMembers extends Component {
    state = {
        currentBoardMembers: []
    }

    componentDidMount = () => {
        this.setState({ currentBoardMembers: this.props.board.teamMembers });
    }

    updateTeamMembers = (user) => {
        const board = this.props.board;
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
        this.setState({ currentBoardMembers: teamMembers });
        this.props.updateBoard(board, msg, notificationType);
    }

    onStopPropagation = (ev) => {
        ev.stopPropagation();
    }

    render() {
        const currentBoardMembers = this.state.currentBoardMembers;
        const users = this.props.users.filter(user => !currentBoardMembers.find(boardMember => user._id === boardMember._id));
        return (
            <div className="board-team-members-container text-center column"
                onClick={(ev) => this.onStopPropagation(ev)}
                style={{ background: `${this.props.dominantColor.slice(0, -4) + '.9)'}`, backdropFilter: 'blur(5px)' }}
            >
                <div className="members-onboard flex column">
                    <h2 className='fs14' style={{ color: this.props.isDarkBackground ? 'white' : 'black' }} >board members :</h2>
                    <hr />
                    {this.state.currentBoardMembers.map(teamMember => {
                        return (
                            <div key={teamMember._id} className="team-member flex align-center"
                                onClick={() => this.updateTeamMembers(teamMember)}>
                                <div className="team-member-icon-wrapper flex center" style={{ background: teamMember.color ,boxShadow: '0px 0px 1px 0px #000000bf'}} >
                                    <div className="team-member-icon" >
                                        <p className="uppercase" style={{ color: '#172b4d' }}>
                                            {utils.createUserIcon(teamMember.firstName, teamMember.lastName)}
                                        </p>
                                    </div>
                                </div>
                                <span className="capitalize"
                                    style={{ color: this.props.isDarkBackground ? 'white' : 'black' }}
                                >{teamMember.firstName} {teamMember.lastName}</span>
                            </div>
                        )
                    })}
                </div>

                <div className="add-team-members flex column">
                    <h2 className='fs14' style={{ color: this.props.isDarkBackground ? 'white' : 'black' }}>
                        add / remove users</h2>
                    <hr />
                    {users.map(user => {
                        return (
                            <div key={user._id} className="team-member flex align-center"
                                onClick={() => this.updateTeamMembers(user)}>
                                <div className="team-member-icon-wrapper flex align-center justify-center" style={{background: user.color , boxShadow: '0px 0px 1px 0px #000000bf'}}>
                                    <div className="team-member-icon">
                                        <p className="uppercase" style={{ color: '#172b4d' }}>
                                            {utils.createUserIcon(user.firstName, user.lastName)}
                                        </p>
                                    </div>
                                </div>
                                <span className="capitalize" style={{ color: this.props.isDarkBackground ? 'white' : 'black' }}>
                                    {user.firstName} {user.lastName}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}
