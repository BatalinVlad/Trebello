import React, { useState, useEffect, useRef } from 'react';

const Filter = props => {

  const [filterBy, setFilterBy] = useState({
    title: '',
    teamMembers: ''
  });

  const [filterByTeamMemberName, setMemberFilterName] = useState('all');

  const teamMembers = props.teamMembers;

  const prevFilterBy = useRef(filterBy);

  useEffect(() => {
    if (filterBy !== prevFilterBy.current) {
      prevFilterBy.current = filterBy;
      props.filterBoardHandler(filterBy);
    }
  }, [filterBy, props]);

  const inputChange = (fieldName, value) => {
    setFilterBy((prevState) => ({ ...prevState, [fieldName]: value }));
    if (fieldName === 'teamMembers') {
      props.toggleFilterByMemberHandler();
      setMemberFilterName(value);
    }
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

      <div className={`custom-select ${props.isDarkBackground ? 'dark' : 'light'}`}
        onClick={props.toggleFilterByMemberHandler}
      >
        <span>{filterByTeamMemberName}</span>

        {props.toggleFilterByMember &&
          <ul className="options">
            <li className={`filter-option pointer ${'all' === filterByTeamMemberName && 'filter-checked'} `}
              onClick={() => inputChange('teamMembers', "all")} >all...</li>
            {teamMembers.map((teamMember) => (
              <li
                className={`filter-option pointer ${teamMember.username === filterByTeamMemberName && 'filter-checked'} `}
                key={teamMember._id}
                value={teamMember.username}
                onClick={() => inputChange('teamMembers', teamMember.username)}
              >
                <span className="capitalize">
                  {teamMember.firstName} {teamMember.lastName}
                </span>
              </li>
            ))}
          </ul>
        }
      </div>
    </div>
  );
}

export default Filter;