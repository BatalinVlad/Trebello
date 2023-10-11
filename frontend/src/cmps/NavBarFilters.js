import React from "react"

import HomeIcon from '@mui/icons-material/Home';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import ImageSearchOutlinedIcon from '@mui/icons-material/ImageSearchOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import Filter from '../cmps/Filter';

import { useDispatch } from 'react-redux';
import { deleteBoard } from "../actions/BoardActions";
import { useNavigate } from "react-router-dom";



const NavBarFilters = props => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleSplashMenuHandler = (ev) => {
        ev.stopPropagation();
        props.setToggleSplashMenu(prevToggleSplashMenu => !prevToggleSplashMenu);
        props.setShowHistory(false);
        props.setToggleBoardTeamMembers(false);
        props.setToggleLogin(false);
    };

    const toggleBoardHistoryHandler = (ev) => {
        ev.stopPropagation();
        props.setShowHistory(prevShowHistory => !prevShowHistory);
        props.setToggleSplashMenu(false);
        props.setToggleBoardTeamMembers(false);
        props.setToggleLogin(false);
    };

    const toggleBoardTeamMembersHandler = (ev) => {
        ev.stopPropagation();
        props.setToggleBoardTeamMembers(prevToggleBoardTeamMembers => !prevToggleBoardTeamMembers);
        props.setShowHistory(false);
        props.setToggleSplashMenu(false);
        props.setToggleLogin(false);
    };

    const deleteBoardHandler = () => {
        if (props.loadedBoard.type === 'template' || !props.loggedInUser ||
            props.loggedInUser._id !== props.loadedBoard.createdBy._id) return;
        dispatch(deleteBoard(props.loadedBoard._id));
        navigate('/');
    }

    return (
        <React.Fragment>
            <div className="board-page-nav-bar-filters flex wrap align-center space-between">
                <div className="left-section flex wrap" >
                    <button
                        className={`board-page-nav-bar-filters nav-btn goBackToHome flex justify-center align-center ${(props.isDarkBackground) ? 'dark' : 'light'}`}
                        onClick={props.goBackHandler}
                        style={{ backgroundColor: `${props.dominantColor}`, backdropFilter: 'blur(5px)' }}
                    >
                        <HomeIcon />
                    </button>
                    <div style={{ backgroundColor: `${props.dominantColor}`, backdropFilter: 'blur(5px)' }} className="board-page-nav-bar-filters-divider"></div>

                    <Filter
                        toggleFilterByMember={props.toggleFilterByMember}
                        toggleFilterByMemberHandler={props.toggleFilterByMemberHandler}
                        filterBoardHandler={props.filterBoardHandler}
                        filterBoard={props.loadedBoard}
                        teamMembers={props.loadedBoard.teamMembers}
                        dominantColor={props.dominantColor}
                        isDarkBackground={props.isDarkBackground} />

                    <div style={{ background: `${props.dominantColor}`, backdropFilter: 'blur(5px)' }} className="board-page-nav-bar-filters-divider"></div>

                </div>

                <div className="right-section flex align-center" style={{ marginTop: 2 }}>
                    <div className="board-page-nav-bar-filters-item fill-height">
                        <button
                            className={`board-page-nav-bar-filters nav-btn flex center ${(props.isDarkBackground) ? 'dark' : 'light'}`}
                            onClick={deleteBoardHandler}
                            style={{ backgroundColor: `${props.dominantColor}`, backdropFilter: 'blur(5px)' }}
                        >
                            <DeleteOutlineIcon />
                            <span>delete</span>
                        </button>
                    </div>
                    <div style={{ backgroundColor: `${props.dominantColor}`, backdropFilter: 'blur(5px)' }} className="board-page-nav-bar-filters-divider"></div>

                    <div className="board-page-nav-bar-filters-item fill-heigh">
                        <button
                            className={`nav-btn flex center fill-height capitalize ${(props.isDarkBackground) ? 'dark' : 'light'}`}
                            style={{ background: `${props.dominantColor}`, backdropFilter: 'blur(5px)' }}
                            onClick={toggleBoardTeamMembersHandler}>
                            <GroupAddOutlinedIcon style={{ marginRight: '4px' }} />
                            <span>add members </span>
                        </button>
                    </div>

                    <div style={{ background: `${props.dominantColor}`, backdropFilter: 'blur(5px)' }} className="board-page-nav-bar-filters-divider"></div>

                    <div className="board-page-nav-bar-filters-item fill-height flex center" >
                        <button
                            className={`nav-btn flex center fill-height capitalize ${(props.isDarkBackground) ? 'dark' : 'light'}`}
                            style={{ background: `${props.dominantColor}`, backdropFilter: 'blur(5px)' }}
                            onClick={(ev) => toggleSplashMenuHandler(ev)}>
                            <ImageSearchOutlinedIcon style={{ marginRight: 5 }} />
                            <span> change background </span>
                        </button>
                    </div>

                    <div style={{ background: `${props.dominantColor}`, backdropFilter: 'blur(5px)' }} className="board-page-nav-bar-filters-divider"></div>

                    <div className="board-page-nav-bar-filters-item flex fill-height">
                        <button
                            className={`nav-btn flex center fill-height capitalize ${(props.isDarkBackground) ? 'dark' : 'light'}`}
                            style={{ background: `${props.dominantColor}`, backdropFilter: 'blur(5px)' }}
                            onClick={toggleBoardHistoryHandler}>
                            <HistoryOutlinedIcon style={{ marginRight: 5 }} />
                            <span> show history </span>
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default NavBarFilters