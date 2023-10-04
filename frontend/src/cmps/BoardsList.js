import React from 'react';
import { NavLink } from 'react-router-dom';

import BoardPreview from './BoardPreview';

const BoardsList = ({ boards, templateBoards, user }) => {
    const myBoards = (user) ? boards.filter(board => board.createdBy._id === user._id) : '';
    const myCollaboratedBoards = (user) ? boards.filter(board => {
        return board.teamMembers.find(teamMember => user._id === teamMember._id && user._id !== board.createdBy._id);
    }) : '';

    return (
        <section className="boards-list">
            {templateBoards &&
                <div className="boards-list-container" >
                    <h2 className="capitalize" style={{ paddingBottom: '10px' }}>check our premade templates</h2>
                    <div className="templates-container flex row" >
                        {templateBoards.map(templateBoard => (
                            <div key={templateBoard._id} className="template-container">
                                <NavLink className="pointer" to={`/board/${'templates'}/${templateBoard._id}`} >
                                    <BoardPreview board={templateBoard} />
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>
            }
            {
                user &&
                <div>
                    <div className="boards-list-container">
                        {(myBoards.length === 0) ?
                            <p> you haven't created a board yet...</p> :
                            <div className='templates-container'>
                                <p className="capitalize">created boards</p>
                                <div className="board-container flex row">
                                    {myBoards.map(myBoard => (
                                        <NavLink className="pointer" key={myBoard._id} to={`/board/board/${myBoard._id}`}>
                                            <BoardPreview board={myBoard} />
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                    <div className="boards-list-container flex column" style={{marginTop : '10px'}}>
                        <p className="capitalize"> boards you collaborate on </p>
                        {(myCollaboratedBoards.length === 0) ?
                            <div className="fill-width flex grow center">
                                <span className="caspanitalize"> you're not collaborating on any boards yet... </span>
                            </div>
                            :
                            <div className="boards-list-container flex row">
                                {myCollaboratedBoards.map(myCollaboratedBoard => (
                                    <NavLink className="pointer" key={myCollaboratedBoard._id} to={`/board/board/${myCollaboratedBoard._id}`}>
                                        <BoardPreview board={myCollaboratedBoard} />
                                    </NavLink>
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