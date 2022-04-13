import React, { useState } from 'react';
import './styles/App.css';
import initialData from './initialData';
import Information from './components/Information';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Experience from './components/Experience';

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
