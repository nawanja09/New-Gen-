import React from "react";
import { NavLink } from "react-router-dom";
import { AdminAuthorLink, FMLink ,SMLink,CLink,IMLink,EMLink} from "../protect/hiddenLink";
import { Link } from "react-router-dom";
const PageMenu = () => {
  return (
    <div>
      <nav className="--btn-google --p --mb">
        <ul className="home-links">
          <li>
            <NavLink to="/profile">Profile    </NavLink>
          </li>
          <li>
            <NavLink to="/changePassword">    Change Password    </NavLink>
          </li>

          <CLink>
            <li>
              <NavLink to="#">    Give Feedback    </NavLink>
            </li>
          </CLink>
      
          <AdminAuthorLink>
            <li>
              <NavLink to="/users">    User Status    </NavLink>
            </li>
           
          
          </AdminAuthorLink>
          <FMLink>
            <li>
              <NavLink to="/Dashboard">    Income and Outcome    </NavLink>
           


            </li>
          </FMLink>
          <SMLink>
            <li>
              <NavLink to="#">    SM Dashboard    </NavLink>
            </li>
          </SMLink>

          <SMLink>
            <li>
              <NavLink to="#">    SM Dashboard    </NavLink>
            </li>
          </SMLink>

          <IMLink>
            
          <NavLink to="#">    IM Dashboard    </NavLink>
          
          </IMLink>


          <EMLink>
            
            <NavLink to="#">    EM Dashboard    </NavLink>
            
            </EMLink>

        </ul>
      </nav>
    </div>
  );
};

export default PageMenu;
