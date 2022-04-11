import React, { useState } from 'react';
import './styles/App.css';
import initialData from './initialData';
import Information from './components/Information';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';


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


function App() {
  const [data, setData] = useState(
    () => JSON.parse(localStorage.getItem('savedData')) || initialData
  );

  React.useEffect(() => {
    localStorage.setItem('savedData', JSON.stringify(data));
  }, [data]);

  function resetData() {
    setData(initialData);
  }

  return (
    <div className="container">
      <div className="resume">
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
        <h3 className="reset" onClick={resetData}>
          Reset Data
        </h3>
      </div>
    </div>
  );
}

export default App;
