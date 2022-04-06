import React, { useState, useEffect } from 'react';
import './styles/App.css';
import initialData from './initialData';
import Information from './components/Information';
import Skills from './components/Skills'

function Experience({ experience }) {
  return (
    <div className="experience">
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
    </div>
  );
}

function Projects({ projects }) {
  return (
    <div className="projects">
      <h2 className="section-title">PROJECTS</h2>
      {projects.map((project) => (
        <div className="project-group" key={project.title}>
          <h3 className="projects-main">{project.title}</h3>
          <p>{project.subtitle}</p>
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
          <h3 className="education-main">{school.title}</h3>
          <p>{school.subtitle}</p>
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
      <h3 className="reset" onClick={resetData}>
          Reset Data
        </h3>
        <Information
          information={data.information}
          setData={setData}
          data={data}
        />
        <Skills skills={data.skills} setData={setData} data={data} />
        <Experience
          experience={data.experience}
          setData={setData}
          data={data}
        />
        <Projects projects={data.projects} setData={setData} data={data} />
        <Education education={data.education} setData={setData} data={data} />

      </div>
    </div>
  );
}

export default App;
