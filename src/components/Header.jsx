import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { flights, isLoading } = useSelector((store) => store);

  return (
    <header className="container d-flex flex-column align-items-center p-3">
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="d-flex align-items-center gap-3">
          <img width={70} src="/plane-logo.png" />
          <h1>Flight Radar</h1>
        </div>
        <div className="kayan-yazi-container">
          <h6 className="kayan-yazi fs-4">
            {isLoading
              ? "Flights are calculating..."
              : `Welcome! ${flights?.length} Flights found...`}
          </h6>
        </div>
      </div>

      <nav className=" border-0  btn btn-sm btn-group">
        <NavLink className="btn bg-black text-light border-0 px-4 " to={"/"}>
          Map View
        </NavLink>
        <NavLink className="btn bg-black text-light border-0 px-4" to={"/list"}>
          List View
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
