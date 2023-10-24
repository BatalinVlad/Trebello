import React from 'react';


export default function ScreenFilter(props) {
    return (
        <div className="screen-filter z2" onClick={_ => props.onToggle()}></div>
    )
}