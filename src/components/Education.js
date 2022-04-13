import React, { useState, useEffect } from 'react';

export default function Education({ education, data, setData }) {
  const [editing, setEditing] = useState(false);
  const [activeMode, setActiveMode] = useState(false);
  const [eduData, setEduData] = useState(education);

  useEffect(() => {
    setEduData(education);
  }, [data.education]);

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
      education: eduData.map((group) => ({ ...group })),
    });
    document.querySelector('.education').scrollIntoView();
  }

  function handleTitleChange(event, school) {
    const updatedEducation = eduData.map((group) => {
      group = { ...group };
      if (group.title === school.title && group.subtitle === school.subtitle) {
        group.title = event.target.value;
      }
      return group;
    });
    setEduData(updatedEducation);
  }

  function handleSubtitleChange(event, school) {
    const updatedEducation = eduData.map((group) => {
      group = { ...group };
      if (group.title === school.title && group.subtitle === school.subtitle) {
        group.subtitle = event.target.value;
      }
      return group;
    });
    setEduData(updatedEducation);
  }

  function handleDeleteSection(event, skill) {
    event.preventDefault();
    const updatedEducation = eduData.filter(
      (group) => group.title !== skill.title
    );
    setEduData(updatedEducation);
  }

  function handleAddSection(event) {
    event.preventDefault();

    const updatedEducation = [...eduData, { title: '', subtitle: '' }];

    setEduData(updatedEducation);
  }

  const educationForm = eduData.map((school, index) => (
    <fieldset key={index}>
      <legend>Education Level</legend>
      <label htmlFor={school.title}>School</label>
      <input
        id={school.title}
        value={school.title}
        name={school.title}
        placeholder="School Name"
        onChange={(event) => {
          handleTitleChange(event, school);
        }}
      ></input>
      <label htmlFor={school.subtitle}>Degree</label>
      <input
        id={school.subtitle}
        value={school.subtitle}
        name={school.subtitle}
        placeholder="Degree Name and Major"
        onChange={(event) => {
          handleSubtitleChange(event, school);
        }}
      ></input>
      <button
        onClick={(event) => handleDeleteSection(event, school)}
        className="delete-section"
      >
        <span className="material-icons">delete</span>
        Delete school
      </button>
    </fieldset>
  ));

  return (
    <div
      className={`education${activeMode ? ' active' : ''}`}
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
          {educationForm}
          <div className="component-buttons">
            <button onClick={handleAddSection} className="add-section">
              <span className="material-icons">add</span>
              Add school
            </button>
            <button onClick={endEdit}>Submit</button>
          </div>
        </form>
      ) : (
        <>
          <h2 className="section-title">EDUCATION</h2>
          {education.map((school, index) => (
            <div className="education-group" key={index}>
              <h3 className="education-main">{school.title}</h3>
              <p>{school.subtitle}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
