import { faBackward } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"


const Header = ({fileName}) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-light mt-2 bg-white shadow-sm">
      <p className="navbar-brand">{fileName}</p>
      <ul className="navbar-nav">
        <li className="nav-item">
          <button className="btn btn-dark" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon = {faBackward}/>
            Go Back</button>
        </li>

      </ul>
    </nav>
  )
}

export default Header
