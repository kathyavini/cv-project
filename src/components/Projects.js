import React, { useState, useEffect } from 'react';

export default function Projects({ projects, data, setData }) {
  const [editing, setEditing] = useState(false);
  const [activeMode, setActiveMode] = useState(false);
  const [projectData, setProjectData] = useState(projects);

  useEffect(() => {
    setProjectData(projects);
  }, [data.projects]);

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
      projects: projectData.map((group) => ({ ...group })),
    });
    document.querySelector('.projects').scrollIntoView();
  }

  function handleTitleChange(event) {
    const updatedProjects = projectData.map((group) => {
      group = { ...group };
      if (group.title === event.target.name) {
        group.title = event.target.value;
      }
      return group;
    });
    setProjectData(updatedProjects);
  }

  function handleSubtitleChange(event) {
    const updatedProjects = projectData.map((group) => {
      group = { ...group };
      if (group.subtitle === event.target.name) {
        group.subtitle = event.target.value;
      }
      return group;
    });
    setProjectData(updatedProjects);
  }

  function handleDeleteSection(event, skill) {
    event.preventDefault();
    const updatedProjects = projectData.filter(
      (group) => group.title !== skill.title
    );
    setProjectData(updatedProjects);
  }

  function handleAddSection(event) {
    event.preventDefault();

    const updatedProjects = [...projectData, { title: '', subtitle: '' }];

    setProjectData(updatedProjects);
  }

  const projectsForm = projectData.map((project, index) => (
    <fieldset key={index}>
      <legend>Project</legend>
      <label htmlFor={project.title}>Name</label>
      <input
        id={project.title}
        value={project.title}
        name={project.title}
        placeholder="Project Name"
        onChange={handleTitleChange}
      ></input>
      <label htmlFor={project.subtitle}>Details</label>
      <input
        id={project.subtitle}
        value={project.subtitle}
        name={project.subtitle}
        placeholder="Project Description"
        onChange={handleSubtitleChange}
      ></input>
      <button
        onClick={(event) => handleDeleteSection(event, project)}
        className="delete-section"
      >
        <span className="material-icons">delete</span>
        Delete project
      </button>
    </fieldset>
  ));

  return (
    <div
      className={`projects${activeMode ? ' active' : ''}`}
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
          {projectsForm}
          <div className="component-buttons">
            <button onClick={handleAddSection} className="add-section">
              <span className="material-icons">add</span>
              Add project
            </button>
            <button onClick={endEdit}>Submit</button>
          </div>
        </form>
      ) : (
        <>
          <h2 className="section-title">PROJECTS</h2>
          {projects.map((project) => (
            <div className="project-group" key={project.title}>
              <h3 className="projects-main">{project.title}</h3>
              <p>{project.subtitle}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
