/* eslint-disable react/prop-types */
import "./form.css";

const Form = ({
  value,
  setValue,
  handleSearch,
  handleFiltered,
  toggleTheme,
  selectedImage,
  selectedSearch,
}) => {
  return (
    /* Search and filtering form section */
    <div className="header">
      {/* Todo App Header  */}
      <h1>TODO LIST</h1>
      {/* Main form button container */}
      <div className="form-container">
        <div className="search">
          <form onSubmit={handleSearch}>
            <input
              className="search-input"
              placeholder="Search note..."
              type="text"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </form>
          <button className="search-button" onClick={handleSearch}>
            <img src={selectedSearch} />
          </button>
        </div>
        <div className="buttons-container">
          <select className="select" onChange={handleFiltered}>
            <option value="all">ALL</option>
            <option value="completed">COMPLETED</option>
            <option value="incompleted">INCOMPLETED</option>
          </select>
          {/* Toggle theme button  */}
          <button
            className="toggle"
            style={{
              backgroundImage: "url(" + selectedImage + ")",
            }}
            onClick={toggleTheme}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Form;
