import React, { useState } from 'react';
import './styles/App.css';
import initialData from './initialData';
import Information from './components/Information';


function Skills({ skills }) {
  const [editing, setEditing] = useState(false);
  const [activeMode, setActiveMode] = useState(false);

  function handleMouseEnter(event) {
    setActiveMode(true);
  }

  function handleMouseLeave(event) {
    setActiveMode(false);
  }

  return (
    <div
      className={`skills ${activeMode && 'active'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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

function Experience({ experience }) {
  return (
    <div className="experience">
      <h2 className="section-title">EXPERIENCE</h2>
      {experience.map((job) => {
        return (
          <div className="experience-group" key={job.title}>
            <h3>{job.title}</h3>
            <h4>
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
    </div>
  );
}

function Projects({ projects }) {
  return (
    <div className="projects">
      <h2 className="section-title">PROJECTS</h2>
      {projects.map((project) => (
        <div className="project-group" key={project.title}>
          <h3>{project.title}</h3>
          <h4>{project.subtitle}</h4>
        </div>
      ))}
    </div>
  );
}

function Education({ education }) {
  return (
    <div className="education">
      <h2 className="section-title">EDUCATION</h2>
      {education.map((school) => (
        <div className="education-group" key={school.title}>
          <h3>{school.title}</h3>
          <h4>{school.subtitle}</h4>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [data, setData] = useState(
    () => JSON.parse(localStorage.getItem('savedData')) || initialData
  );

  React.useEffect(() => {
    localStorage.setItem('savedData', JSON.stringify(data));
  }, [data]);

  // // This is a little local storage functionality test
  // function dummyChange() {
  //   const newInformation = { ...data.information };
  //   newInformation.name = 'Clicked!';
  //   setData({ ...data, information: newInformation });
  // }

  function resetData() {
    setData(initialData);
  }

  return (
    <div className="container">
      <div className="resume">        
      <h3 className="reset" onClick={resetData}>Reset Data</h3>
        <Information information={data.information} setData={setData} data={data}/>
        <Skills skills={data.skills} />
        <Experience experience={data.experience} />
        <Projects projects={data.projects} />
        <Education education={data.education} />

      </div>
    </div>
  );
}

export default App;
