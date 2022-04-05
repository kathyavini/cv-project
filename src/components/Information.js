import React, { useState, useEffect } from 'react';

export default function Information({ information, data, setData }) {
  const [editing, setEditing] = useState(false);
  const [activeMode, setActiveMode] = useState(false);
  const [infoData, setInfoData] = useState(information);

  useEffect(()=> {
    setInfoData(information)
  }, [data.information])

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

  function endEdit(event) {
    // event.preventDefault();
    setEditing(false);
    setActiveMode(false);
    setData({ ...data, information: { ...infoData } });
  }

  function handleChange(event) {
    setInfoData({ ...infoData, [event.target.name]: event.target.value });
  }

  return (
    // We want an icon that will appear on mouseover (along with a border/outline)
    // The icon should have the toggleEdit onClick
    <div
      className={`information ${activeMode && 'active'}`}
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
          <input
            placeholder="Full name"
            name="name"
            value={infoData.name}
            onChange={handleChange}
          ></input>
          <input
            placeholder="Job Title"
            name="title"
            value={infoData.title}
            onChange={handleChange}
          ></input>
          <input
            placeholder="Location"
            name="location"
            value={infoData.location}
            onChange={handleChange}
          ></input>
          <input
            placeholder="Github"
            name="github"
            value={infoData.github}
            onChange={handleChange}
          ></input>
          <input
            placeholder="Email"
            name="email"
            value={infoData.email}
            onChange={handleChange}
          ></input>
          <input
            placeholder="phone"
            name="phone"
            value={infoData.phone}
            onChange={handleChange}
          ></input>
          <button onClick={endEdit}>Submit</button>
        </form>
      )}
      <>
        <h1 className="name">{information.name}</h1>
        <h2 className="title">{information.title}</h2>
        <h3 className="contact">
          {information.location} | {information.github} | {information.email} |{' '}
          {information.phone}
        </h3>
      </>
    </div>
  );
}
