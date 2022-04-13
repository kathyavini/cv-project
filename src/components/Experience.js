import React, { useState, useEffect } from 'react';

export default function Experience({ experience, data, setData }) {
  const [editing, setEditing] = useState(false);
  const [activeMode, setActiveMode] = useState(false);
  const [experienceData, setExperienceData] = useState(experience);

  useEffect(() => {
    setExperienceData(experience);
  }, [data.experience]);

  function handleMouseEnter(event) {
    setActiveMode(true);
  }

  function handleMouseLeave(event) {
    setActiveMode(false);
  }

  function toggleEdit() {
    setEditing((prev) => !prev);
    setActiveMode(true);
  }

  function endEdit() {
    setEditing(false);
    setActiveMode(false);
    setData({
      ...data,
      experience: experienceData.map((group) => ({ ...group })),
    });
    document.querySelector('.experience').scrollIntoView();
  }

  function handleTitleChange(event) {
    const updatedExperience = experienceData.map((group) => {
      group = { ...group }; // nested state, sigh
      if (group.title === event.target.name) {
        // this breaks on repeat company names
        group.title = event.target.value;
      }
      return group;
    });
    setExperienceData(updatedExperience);
  }

  function handleSubtitleChange(event, exp) {
    const updatedExperience = experienceData.map((group) => {
      group = { ...group };
      if (group.title === exp.title && group.subtitle === exp.subtitle) {
        group.subtitle = event.target.value;
      }
      return group;
    });
    setExperienceData(updatedExperience);
  }

  function handleDateChange(event, exp) {
    const updatedExperience = experienceData.map((group) => {
      group = { ...group };
      if (group.title === exp.title && group.subtitle === exp.subtitle) {
        // this breaks on repeat position names
        group.dates = event.target.value;
      }
      return group;
    });
    setExperienceData(updatedExperience);
  }

  function handleListChange(event, skill) {
    const newList = [...skill.body];
    newList[event.target.name] = event.target.value;

    const updatedExperience = experienceData.map((group) => {
      group = { ...group };
      if (group.title === skill.title) {
        group.body = newList;
      }
      return group;
    });
    setExperienceData(updatedExperience);
  }

  function handleDeleteListItem(event, skill, item) {
    event.preventDefault();

    const newList = [
      ...skill.body.slice(0, item),
      ...skill.body.slice(item + 1),
    ];

    const updatedExperience = experienceData.map((group) => {
      group = { ...group };
      if (group.title === skill.title) {
        group.body = newList;
      }
      return group;
    });
    setExperienceData(updatedExperience);
  }

  function handleAddListItem(event, exp) {
    event.preventDefault();

    const newList = [...exp.body, ''];

    const updatedExperience = experienceData.map((group) => {
      group = { ...group };
      if (group.title === exp.title) {
        group.body = newList;
      }
      return group;
    });
    setExperienceData(updatedExperience);
  }

  function handleDeleteSection(event, exp) {
    event.preventDefault();
    const updatedExperience = experienceData.filter(
      (group) => group.title !== exp.title
    );
    setExperienceData(updatedExperience);
  }

  function handleAddSection(event) {
    event.preventDefault();

    // Watch this line; it might need more nested destructuring, like this:
    // const updatedExperience = [...ExperienceData.map(group => ({...group})), { title: '', body: [''] }];

    const updatedExperience = [...experienceData, { title: '', body: [''] }];

    setExperienceData(updatedExperience);
  }

  const expForm = experienceData.map((exp, index) => (
    <fieldset key={index}>
      <legend>Experience</legend>
      <label htmlFor={exp.title}>Job</label>
      <input
        id={exp.title}
        name={exp.title}
        value={exp.title}
        placeholder="Company Name"
        onChange={handleTitleChange}
      ></input>
      <label htmlFor={exp.subtitle}>Position</label>
      <input
        id={exp.subtitle}
        name={exp.subtitle}
        value={exp.subtitle}
        placeholder="Position/Title"
        onChange={(event) => {
          handleSubtitleChange(event, exp);
        }}
      ></input>
      <label htmlFor={exp.dates}>Dates</label>
      <input
        id={exp.dates}
        name={exp.dates}
        value={exp.dates}
        placeholder="Dates at Position"
        onChange={(event) => {
          handleDateChange(event, exp);
        }}
      ></input>
      <label className="list-label">Details</label>
      {exp.body.map((item, itemIndex) => (
        <div className="input-bar" key={itemIndex}>
          <input
            name={itemIndex}
            placeholder="Position Detail"
            value={item}
            onChange={(event) => {
              handleListChange(event, exp);
            }}
          ></input>
          <span
            onClick={(event) => handleDeleteListItem(event, exp, itemIndex)}
            className="material-icons"
          >
            delete
          </span>
        </div>
      ))}
      <button
        onClick={(event) => handleAddListItem(event, exp)}
        className="add-item"
      >
        <span className="material-icons">add</span>
        Add detail
      </button>
      <button
        onClick={(event) => handleDeleteSection(event, exp)}
        className="delete-section"
      >
        <span className="material-icons">delete</span>
        Delete Experience
      </button>
    </fieldset>
  ));

  return (
    <div
      className={`experience${activeMode ? ' active' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {activeMode && !editing && (
        <span
          className="material-icons edit-button gradient"
          onClick={toggleEdit}
        >
          edit
        </span>
      )}
      {editing ? (
        <form>
          {expForm}
          <div className="component-buttons">
            <button onClick={handleAddSection} className="add-section">
              <span className="material-icons">add</span>
              Add experience
            </button>
            <button onClick={endEdit}>Submit</button>
          </div>
        </form>
      ) : (
        <>
          <h2 className="section-title">EXPERIENCE</h2>
          {experience.map((job) => {
            return (
              <div className="experience-group" key={job.title}>
                <h3 className="item-title">{job.title}</h3>
                <h4 className="item-subtitle">
                  {job.subtitle} | {job.dates}
                </h4>
                <ul key={`points${job.title}`}>
                  {job.body.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
