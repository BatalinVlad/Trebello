import React from 'react';
import moment from 'moment';

const BoardHistory = (props) => {
    return (
        <div className="boardhistory-container column"
            style={{ background: props.dominantColor, backdropFilter: 'blur(10px)' }}
        >
            <div className="flex column">
                <div className="uppercase text-center">
                    <h2 className={props.isDarkBackground ? 'dark' : 'light'} style={{ background: 'transparent' }}>board history :</h2>
                </div>
            </div>
            <ul className="clean-list">
                {props.history.map((item) => (
                    <li key={item.id}>
                        <div className={props.isDarkBackground ? 'dark msg' : 'light msg'} style={{ background: 'transparent' }}>
                            {item.msg}
                            <br />
                            {moment(item.time).calendar()}
                        </div>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BoardHistory;
