import search from "../images/search.png";

const Form = ({ value, setValue, handleSearch, handleFiltered }) => {
  return (
    <div className="head">
      <h1>TODO LIST</h1>
      <div className="header">
        <div className="form-Wrapper">
          <form onSubmit={handleSearch}>
            <input
              className="search"
              placeholder="Search note..."
              type="text"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </form>
          <button className="search-button" onClick={handleSearch}>
            <img src={search} />
          </button>
        </div>
        <div className="select-wrapper">
          <select className="select" onChange={handleFiltered}>
            <option value="all">ALL</option>
            <option value="completed">COMPLETED</option>
            <option value="incompleted">INCOMPLETED</option>
          </select>
          <button className="toggle"></button>
          {/* <button className="toggle" onClick={changeColor}></button> */}
        </div>
      </div>
    </div>
  );
};

export default Form;
