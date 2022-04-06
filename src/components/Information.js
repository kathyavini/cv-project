import React, { useState, useEffect } from 'react';
import InputField from './InputField'

export default function Information({ information, data, setData }) {
  const [editing, setEditing] = useState(false);
  const [activeMode, setActiveMode] = useState(false);
  const [infoData, setInfoData] = useState(information);

  useEffect(() => {
    setInfoData(information);
  }, [data.information]);

  function handleMouseEnter() {
    setActiveMode(true);
  }

  function handleMouseLeave() {
    setActiveMode(false);
  }

  function toggleEdit() {
    setEditing((prev) => !prev);
    setActiveMode(true);
  }

  function endEdit() {
    setEditing(false);
    setActiveMode(false);
    setData({ ...data, information: { ...infoData } });
    document.querySelector('.information').scrollIntoView();
  }

  function handleChange(event) {
    setInfoData({ ...infoData, [event.target.name]: event.target.value });
  }


  return (
    <div
      className={`information${activeMode ? ' active' : ''}`}
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
          <InputField
            legend="Name"
            placeholder="Full name"
            name="name"
            handleChange={handleChange}
            value={infoData.name}
          />
          <InputField
            legend="Position/Title"
            placeholder="Job TItle"
            name="title"
            handleChange={handleChange}
            value={infoData.title}
          />
          <InputField
            legend="Location"
            placeholder="Location (City)"
            name="location"
            handleChange={handleChange}
            value={infoData.location}
          />

          <InputField
            legend="Github"
            placeholder="Link to your github"
            name="github"
            handleChange={handleChange}
            value={infoData.github}
          />

          <InputField
            legend="Email"
            placeholder="Email Address"
            name="email"
            handleChange={handleChange}
            value={infoData.email}
          />

          <InputField
            legend="Phone Number"
            placeholder="Phone number"
            name="phone"
            handleChange={handleChange}
            value={infoData.phone}
          />
          <button onClick={endEdit}>Submit</button>
        </form>
      ) : (
        <>
          <h1 className="name">{information.name}</h1>
          <h2 className="title">{information.title}</h2>
          <h3 className="contact">
            {information.location} | {information.github} | {information.email} | {information.phone}
          </h3>
        </>
      )}
    </div>
  );
}
