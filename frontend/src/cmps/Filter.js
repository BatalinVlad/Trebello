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
      <div
        style={{ background: `${props.dominantColor}`, backdropFilter: 'blur(5px)' }}
        className="board-page-nav-bar-filters-divider"
      ></div>
      
      <input
        type="text"
        placeholder="Search card by name"
        value={filterBy.title}
        onChange={(ev) => inputChange('title', ev.target.value)}
        name="title"
      />

      <div
        style={{ background: `${props.dominantColor}`, backdropFilter: 'blur(5px)' }}
        className="board-page-nav-bar-filters-divider"
      ></div>

      <div className={`custom-select z1 ${props.isDarkBackground ? 'dark' : 'light'}`}
        onClick={props.toggleFilterByMemberHandler}
        style={{ backgroundColor: `${props.dominantColor}`, backdropFilter: 'blur(5px)' }}

      >
        <span style={{ color: props.isDarkBackground ? 'white' : 'black' }}>{filterByTeamMemberName}</span>

        {props.toggleFilterByMember &&
          <ul className={`options ${props.isDarkBackground ? 'dark' : 'light'}`}
            style={{ backgroundColor: `${props.dominantColor}`, backdropFilter: 'blur(5px)' }}
          >
            <li className={`filter-option pointer ${'all' === filterByTeamMemberName && 'filter-checked'} `}
              onClick={(ev) => inputChange('teamMembers', "all", ev.stopPropagation())}
              style={{ backgroundColor: `${props.dominantColor}`, backdropFilter: 'blur(5px)' }}
            >all...</li>
            {teamMembers.map((teamMember) => (
              <li
                className={`filter-option pointer ${teamMember.username === filterByTeamMemberName && 'filter-checked'} `}
                key={teamMember._id}
                value={teamMember.username}
                onClick={(ev) => inputChange('teamMembers', teamMember.username, ev.stopPropagation())}
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