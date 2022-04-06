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
    // Yikes nesting state like this was a mistake
    setData({
      ...data,
      skills: skillData.map((group) => ({...group}))
      });
  }

  function handleTitleChange(event) {
    const updatedSkills = skillData.map((group) => {
      group = {...group};
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
      group = {...group};
      if (group.title === skill.title) {
        group.body = newList;
      }
      return group;
    });
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
        <input
          name={itemIndex}
          key={itemIndex}
          value={item}
          onChange={(event) => {
            handleListChange(event, skill);
          }}
        ></input>
      ))}
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
      {editing && (
        <form>
          {skillForm}
          <button onClick={endEdit}>Submit</button>
        </form>
      )}
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
    </div>
  );
}
