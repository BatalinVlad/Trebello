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

            <div className="boards-list-container" >
                <h1 className="capitalize">check our premade templates</h1>
                <div className="templates-container flex row" >
                    {templateBoards.map(templateBoard => (
                        <NavLink className="pointer" key={templateBoard._id} to={`/board/${'templates'}/${templateBoard._id}`} >
                            <BoardPreview board={templateBoard} />
                        </NavLink>
                    ))}
                </div>
            </div>

            {
                user &&
                <div>
                    <div className="boards-list-container">
                        {(myBoards.length === 0) ?
                            <p> you haven't created a board yet...</p> :
                            <>
                                <p className="capitalize">created boards</p>
                                <div className="boards-container flex row">
                                    {myBoards.map(myBoard => (
                                        <NavLink className="pointer" key={myBoard._id} to={`/board/board/${myBoard._id}`}>
                                            <BoardPreview board={myBoard} />
                                        </NavLink>
                                    ))}
                                </div>
                            </>
                        }
                    </div>

                    <div className="boards-list-container flex column">
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