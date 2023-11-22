import React from 'react';
import { NavLink } from 'react-router-dom';
import { Tilt } from "react-tilt";

import BoardPreview from './BoardPreview';

const BoardsList = ({ boards, templateBoards, user, toggleNewBoardModal }) => {
    (user) && console.log(user)
    const myBoards = (user) ? boards.filter(board => board.createdBy._id === user._id) : '';
    const myCollaboratedBoards = (user) ? boards.filter(board => {
        return board.teamMembers.find(teamMember => user._id === teamMember._id);
    }) : '';
    return (
        <section className="boards-list relative">
            {templateBoards &&
                <div className="boards-list-container" >
                    <h2 className="capitalize" style={{ padding: '5px', width: '100%' }}>check our premade templates</h2>
                    <div className="templates-container flex row" >
                        {templateBoards.map(templateBoard => (
                            <Tilt key={templateBoard._id} className="template-container">
                                <NavLink className="pointer" to={`/board/${'templates'}/${templateBoard._id}`} >
                                    <BoardPreview board={templateBoard} />
                                </NavLink>
                            </Tilt>
                        ))}
                    </div>
                </div>
            }
            {
                user &&
                <div style={{marginTop:'20px'}}>
                    <div className="boards-list-container">
                        {(myBoards.length === 0) ?
                            <div>
                                <p> you haven't created a board yet...</p>
                                <div className="add-board flex">
                                    <button onClick={toggleNewBoardModal}> add </button>
                                </div>
                            </div>
                            :
                            <div className='boards-container'>
                                <p className="capitalize">created boards</p>
                                <div className="board-container flex row">
                                    {myBoards.map(myBoard => (
                                        <Tilt className="pointer" key={myBoard._id}>
                                            <NavLink to={`/board/board/${myBoard._id}`}>
                                                <BoardPreview board={myBoard} />
                                            </NavLink>
                                        </Tilt>
                                    ))}
                                    <div className="add-board flex center">
                                        <button onClick={toggleNewBoardModal}> add </button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="boards-list-container flex column" style={{ marginTop: '10px', padding: '10px 0px 80px 0px' }}>
                        <p className="capitalize"> boards you collaborate on </p>
                        {(myCollaboratedBoards.length === 0) ?
                            <span className="caspanitalize" style={{paddingLeft:'10px'}}> you're not collaborating on any boards yet... </span>
                            :
                            <div className="boards-container flex" style={{gap:'15px', paddingBottom:'10px' }}>
                                {myCollaboratedBoards.map(myCollaboratedBoard => (
                                    <Tilt className="pointer" key={myCollaboratedBoard._id}>
                                        <NavLink to={`/board/board/${myCollaboratedBoard._id}`}>
                                            <BoardPreview board={myCollaboratedBoard} />
                                        </NavLink>
                                    </Tilt>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            }
        </section >
    )
}

export default BoardsList;