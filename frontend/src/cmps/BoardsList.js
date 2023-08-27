import React from 'react';
import { NavLink } from 'react-router-dom';

import BoardPreview from './BoardPreview';

const BoardsList = ({ boards, user }) => {
    const templateBoards = boards.filter(board => board.isTemplate);
    const myBoards = (user) ? boards.filter(board => board.createdBy._id === user._id) : '';
    const myCollaboratedBoards = (user) ? boards.filter(board => {
        return board.teamMembers.find(teamMember => user._id === teamMember._id && user._id !== board.createdBy._id);
    }) : '';

    return (
        <section className="boards-list">

            <div className="boards-list-main-inner-container-wrapper">
                <div className="boards-list-main-inner-container">
                    <div>
                        <p className="capitalize"> check our premade templates</p>
                        <hr />
                    </div>
                    {(templateBoards.length === 0) &&
                        <div className="fill-width text-center">
                            <span className="caspanitalize"> working on it sorry :(  </span>
                        </div>
                    }
                    <div className="boards-list-main-inner-container-grid flex justify-center column">
                        {templateBoards.map(board => (
                            <div className="boards-list-main-inner-container-grid-item pointer" key={board._id} >
                                <BoardPreview board={board} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {user &&
                <div>
                    <div className="boards-list-main-inner-container-wrapper">
                        {(myBoards.length === 0) ?
                            <p> you haven't created a board yet...</p> :
                            <div className="boards-list-main-inner-container">

                                <div>
                                    <p className="capitalize">created boards</p>
                                    <hr />
                                </div>

                                <div className="boards-list-main-inner-container-grid flex justify-center column">
                                    {myBoards.map(myBoard => (
                                        <NavLink className="boards-list-main-inner-container-grid-item" key={myBoard._id} to={`/board/${myBoard._id}`}>
                                            <BoardPreview board={myBoard} />
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                    <div className="boards-list-main-inner-container-wrapper">
                        <div className="boards-list-main-inner-container">
                            <p className="capitalize"> boards you collaborate on </p>
                            <hr />

                            {(myCollaboratedBoards.length === 0) ?
                                <div className="fill-width text-center">
                                    <span className="caspanitalize"> you're not collaborating on any boards yet... </span>
                                </div>
                                :
                                <div className="boards-list-main-inner-container-grid flex justify-center column">
                                    {myCollaboratedBoards.map(myCollaboratedBoard => (
                                        <NavLink className="boards-list-main-inner-container-grid-item" key={myCollaboratedBoard._id} to={`/board/${myCollaboratedBoard._id}`}>
                                            <BoardPreview board={myCollaboratedBoard} />
                                        </NavLink>
                                    ))}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}

export default BoardsList;