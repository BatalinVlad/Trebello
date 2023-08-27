import React, { useState } from "react"
import Typography from '@mui/material/Typography';

import HomeIcon from '@mui/icons-material/Home';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import ImageSearchOutlinedIcon from '@mui/icons-material/ImageSearchOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import Filter from '../cmps/Filter';

const NavBarFilters = props => {
    const [filterIconMod, setFilterIconMod] = useState(false);

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

    return (
        <React.Fragment>
            <div className="board-page-nav-bar-filters flex wrap align-center space-between">
                <div className="left-section flex wrap" >
                    <button
                        className={`board-page-nav-bar-filters nav-btn goBackToHome flex justify-center align-center ${(props.isDarkBackground) ? 'dark' : 'light'}`}
                        onClick={props.goBackHandler} >
                        <HomeIcon />
                    </button>
                    <div style={{ background: (props.isDarkBackground) ? 'white' : 'black' }} className="board-page-nav-bar-filters-divider"></div>
                    <Filter filterBoard={props.filterBoard}
                        teamMembers={props.loadedBoard.teamMembers}
                        isDarkBackground={props.isDarkBackground} />
                    <div style={{ background: (props.isDarkBackground) ? 'white' : 'black' }} className="board-page-nav-bar-filters-divider"></div>
                </div>

                <div className="right-section flex align-center" style={{ marginTop: 2 }}>
                    <div className="board-page-nav-bar-filters-item fill-height">
                        <button
                            className={`nav-btn fill-height capitalize ${(props.isDarkBackground) ? 'dark' : 'light'}`}
                            onClick={toggleBoardTeamMembersHandler}>
                            {!props.filterIconMod ? <Typography component="p" className="flex align-center justify-center p-reset">
                                <GroupAddOutlinedIcon style={{ marginRight: '4px' }} />
                                <span>add members </span>
                            </Typography> :
                                <GroupAddOutlinedIcon />
                            }
                        </button>
                    </div>

                    <div style={{ background: (props.isDarkBackground) ? 'white' : 'black' }} className="board-page-nav-bar-filters-divider"></div>

                    <div className="board-page-nav-bar-filters-item fill-height" >
                        <button
                            className={`nav-btn fill-height capitalize ${(props.isDarkBackground) ? 'dark' : 'light'}`}
                            onClick={(ev) => toggleSplashMenuHandler(ev)}>
                            {!props.filterIconMod ? <Typography component="p" className="flex align-center justify-center p-reset">
                                <ImageSearchOutlinedIcon style={{ marginRight: 5 }} />
                                <span> change background </span>
                            </Typography> :
                                <ImageSearchOutlinedIcon />}
                        </button>
                    </div>

                    <div style={{ background: (props.isDarkBackground) ? 'white' : 'black' }} className="board-page-nav-bar-filters-divider"></div>

                    <div className="board-page-nav-bar-filters-item flex fill-height">
                        <button
                            className={`nav-btn fill-height capitalize ${(props.isDarkBackground) ? 'dark' : 'light'}`}
                            onClick={toggleBoardHistoryHandler}>
                            {!filterIconMod ? <Typography component="p" className="flex align-center justify-center p-reset">
                                <HistoryOutlinedIcon style={{ marginRight: 5 }} />
                                <span> show history </span>
                            </Typography> :
                                <HistoryOutlinedIcon />
                            }
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default NavBarFilters