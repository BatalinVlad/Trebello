import React, { useState, useEffect } from 'react';

const Filter = props => {

    const [filterBy, setFilterBy] = useState({
        title: '',
        teamMembers: ''
    });

    const teamMembers = props.teamMembers;

    useEffect(() => {
        props.filterBoard(filterBy);
    }, [filterBy, props]);

    const inputChange = (ev) => {
        const fieldName = ev.target.name;
        const value = ev.target.value;
        setFilterBy((prevState) => ({ ...prevState, [fieldName]: value }));
    };

    // inputChange = (ev) => {
    //     let fieldName = ev.target.name;
    //     let value = ev.target.value;
    //     this.setState(prevState => ({ filterBy: { ...prevState.filterBy, [fieldName]: value } }), () => this.props.filterBoard(this.state.filterBy));
    // }

    return (
        <div className="board-page-nav-bar-filters-item all-filters flex">
          <input
            type="text"
            placeholder="Search card by name"
            value={filterBy.title}
            onChange={inputChange}
            name="title"
          />
    
          <div
            style={{
              background: props.isDarkBackground ? 'white' : 'black'
            }}
            className="board-page-nav-bar-filters-divider"
          ></div>
          <select
            name="teamMembers"
            style={{
              color: props.isDarkBackground ? 'white' : 'black',
              background: props.isDarkBackground ? '#0000006b' : '#ffffff8e'
            }}
            onChange={inputChange}
            value={filterBy.teamMembers}
          >
            <option value="">all team</option>
            {teamMembers.map((teamMember) => (
              <option
                className="capitalize"
                key={teamMember._id}
                value={teamMember.username}
              >
                {teamMember.firstName} {teamMember.lastName}
              </option>
            ))}
          </select>
        </div>
      );
    }

export default Filter;