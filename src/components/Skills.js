import React, { useState, useEffect } from 'react';

export default function Skills({ skills, data, setData }) {
  const [editing, setEditing] = useState(false);
  const [activeMode, setActiveMode] = useState(false);
  const [skillData, setSkillData] = useState(skills);

  useEffect(() => {
    setSkillData(skills);
  }, [data.skills]);

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
      skills: skillData.map((group) => ({ ...group })),
    });
    document.querySelector('.skills').scrollIntoView();
  }

  function handleTitleChange(event) {
    const updatedSkills = skillData.map((group) => {
      group = { ...group }; // nested state, sigh
      if (group.title === event.target.name) {
        group.title = event.target.value;
      }
      return group;
    });
    setSkillData(updatedSkills);
  }

  function handleListChange(event, skill) {
    const newList = [...skill.body];
    newList[event.target.name] = event.target.value;

    const updatedSkills = skillData.map((group) => {
      group = { ...group };
      if (group.title === skill.title) {
        group.body = newList;
      }
      return group;
    });
    setSkillData(updatedSkills);
  }

  function handleDeleteListItem(event, skill, item) {
    event.preventDefault();

    const newList = [
      ...skill.body.slice(0, item),
      ...skill.body.slice(item + 1),
    ];

    const updatedSkills = skillData.map((group) => {
      group = { ...group };
      if (group.title === skill.title) {
        group.body = newList;
      }
      return group;
    });
    setSkillData(updatedSkills);
  }

  function handleAddListItem(event, skill) {
    event.preventDefault();

    const newList = [...skill.body, 'New item'];

    const updatedSkills = skillData.map((group) => {
      group = { ...group };
      if (group.title === skill.title) {
        group.body = newList;
      }
      return group;
    });
    setSkillData(updatedSkills);
  }

  function handleDeleteSection(event, skill) {
    event.preventDefault();
    const updatedSkills = skillData.filter(
      (group) => group.title !== skill.title
    );
    setSkillData(updatedSkills);
  }

  function handleAddSection(event) {
    event.preventDefault();

    // Watch this line; it might need more nested destructuring
    const updatedSkills = [
      ...skillData,
      { title: 'New Section', body: ['New item'] },
    ];
    console.log(updatedSkills);

    setSkillData(updatedSkills);
  }

  const skillForm = skillData.map((skill, index) => (
    <fieldset key={index}>
      <legend>Skill</legend>
      <label htmlFor={skill.title}>Type</label>
      <input
        name={skill.title}
        value={skill.title}
        onChange={handleTitleChange}
      ></input>
      <label htmlFor={`${skill.title}Items`}>Items</label>
      {skill.body.map((item, itemIndex) => (
        <div className="input-bar" key={itemIndex}>
          <input
            name={itemIndex}
            value={item}
            onChange={(event) => {
              handleListChange(event, skill);
            }}
          ></input>
          <span
            onClick={(event) => handleDeleteListItem(event, skill, itemIndex)}
            className="material-icons"
          >
            delete
          </span>
        </div>
      ))}
      <button
        onClick={(event) => handleAddListItem(event, skill)}
        className="add-item"
      >
        <span className="material-icons">add</span>
        Add skill item
      </button>
      <button
        onClick={(event) => handleDeleteSection(event, skill)}
        className="delete-section"
      >
        <span className="material-icons">delete</span>
        Delete Section
      </button>
    </fieldset>
  ));

  return (
    <div
      className={`skills${activeMode ? ' active' : ''}`}
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
          {skillForm}
          <div className="component-buttons">
            <button onClick={handleAddSection} className="add-section">
              <span className="material-icons">add</span>
              Add section
            </button>
            <button onClick={endEdit}>Submit</button>
          </div>
        </form>
      ) : (
        <>
          <h2 className="section-title">SKILLS</h2>
          {skills.map((section, index) => (
            <div className="skill-group" key={index}>
              <h3 className="skill-title">{section.title}</h3>
              <div className="skill-list">
                {section.body.map((item, itemIndex) => (
                  <React.Fragment key={itemIndex}>
                    <p className="skill-item">{item}</p>
                    <p>{itemIndex !== section.body.length - 1 && '·'}</p>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
