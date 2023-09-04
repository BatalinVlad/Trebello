import React, { useState, useEffect, useRef } from 'react';

const Filter = props => {

  const [filterBy, setFilterBy] = useState({
    title: '',
    teamMembers: ''
  });

  const teamMembers = props.teamMembers;

  const prevFilterBy = useRef(filterBy);

  useEffect(() => {

    if (filterBy !== prevFilterBy.current) {
      prevFilterBy.current = filterBy;
      props.filterBoardHandler(filterBy);
    }

  }, [filterBy, props]);

  const inputChange = (fieldName, value) => {
    debugger
    setFilterBy((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  return (
    <div className="board-page-nav-bar-filters-item all-filters flex justify-end">
      <input
        type="text"
        placeholder="Search card by name"
        value={filterBy.title}
        onChange={(ev) => inputChange('title', ev.target.value)}
        name="title"
      />

      <div
        style={{ background: props.isDarkBackground ? 'white' : 'black' }}
        className="board-page-nav-bar-filters-divider"
      ></div>

      <div className={`custom-select ${props.isDarkBackground ? 'dark' : 'light'}`}>
        <span>filter by member</span>
        <ul className="options">
          <li className="filter-option pointer" onClick={() => inputChange("")} >all...</li>
          {teamMembers.map((teamMember) => (
            <li
              className="filter-option pointer capitalize"
              key={teamMember._id}
              value={teamMember.username}
              onClick={() => inputChange('teamMembers', teamMember.username)}
            >
              {teamMember.firstName} {teamMember.lastName}
            </li>
          ))}
        </ul>
      </div>

    </div >
  );
}

export default Filter;