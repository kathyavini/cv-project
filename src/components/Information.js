import React, { useState, useEffect } from 'react';

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
          <fieldset>
            <legend>Name</legend>
            <input
              placeholder="Full name"
              name="name"
              value={infoData.name}
              onChange={handleChange}
            ></input>
          </fieldset>
          <fieldset>
            <legend>Position/Title</legend>
            <input
              placeholder="Job Title"
              name="title"
              value={infoData.title}
              onChange={handleChange}
            ></input>
          </fieldset>
          <fieldset>
            <legend>Location</legend>
            <input
              placeholder="Location (City)"
              name="location"
              value={infoData.location}
              onChange={handleChange}
            ></input>
          </fieldset>
          <fieldset>
            <legend>Github</legend>
            <input
              placeholder="Link to your Github"
              name="github"
              value={infoData.github}
              onChange={handleChange}
            ></input>
          </fieldset>
          <fieldset>
            <legend>Email</legend>
            <input
              placeholder="Email Address"
              name="email"
              value={infoData.email}
              onChange={handleChange}
            ></input>
          </fieldset>
          <fieldset>
            <legend>Phone Number</legend>
            <input
              placeholder="Phone Number"
              name="phone"
              value={infoData.phone}
              onChange={handleChange}
            ></input>
          </fieldset>
          <button onClick={endEdit}>Submit</button>
        </form>
      ) : (
        <>
          <h1 className="name">{information.name}</h1>
          <h2 className="title">{information.title}</h2>
          <h3 className="contact">
            {information.location} | {information.github} | {information.email}{' '}
            | {information.phone}
          </h3>
        </>
      )}
    </div>
  );
}
