import React from "react";
import { NavLink } from "react-router-dom";
import {
  AdminAuthorLink,
  FMLink,
  SMLink,
  CLink,
  IMLink,
  EMLink,
  APLink,
  ELink,
  CPMLink,
  CCTVLink
} from "../protect/hiddenLink";

const PageMenu = () => {
  return (
    <div>
      <nav className="--btn-google --p --mb">
        <ul className="home-links">
          <li>
            <NavLink to="/profile">Profile </NavLink>
          </li>
          <li>
            <NavLink to="/changePassword"> Change Password </NavLink>
          </li>
          
        
          <CLink>
          <li>
              <NavLink to="/homePage"> Home </NavLink>
            </li>
          <li>
              <NavLink to="/ChomePage"> CCTY Packages </NavLink>
            </li>
            <li>
              <NavLink to="/viewappointment"> View Appointment </NavLink>
            </li>
         
            <li>
              <NavLink to="/appointmentadd"> Make Appointment </NavLink>
            </li>

            <li>
              <NavLink to="/feedback"> Give Feedback </NavLink>
            </li>

  
           
          </CLink>

    

          <AdminAuthorLink>
            <li>
              <NavLink to="/users"> User Status </NavLink>
            </li>

            <li>
              <NavLink to="/feedbackList">  Feedback </NavLink>
            </li>

          </AdminAuthorLink>
          <FMLink>
            <li>
              <NavLink to="/Dashboard"> Income and Outcome </NavLink>
            </li>
            <li>
              <NavLink to="/viewReport/:id"> view report</NavLink>
            </li>
          </FMLink>
          <APLink>
            <li>
              <NavLink to="/appointment"> Appointment </NavLink>
            </li>
          </APLink>

          <SMLink>
            <li>
              <NavLink to="/supplier"> Order </NavLink>
            </li>
            <li>
              <NavLink to="/add"> Place Order </NavLink>
            </li>
            {/* <li>
              <NavLink to="/"> Notification </NavLink>
            </li> */}
          </SMLink>

          <IMLink>
            <NavLink to="/viewProducts"> Dashboard </NavLink>
          </IMLink>

          <IMLink>
            <NavLink to="/add-product"> Add Products </NavLink>
          </IMLink>

          {/* <IMLink>
            <NavLink to="/contact-us"> Contact </NavLink>
          </IMLink> */}

          <EMLink>
            <NavLink to="/employee">Manage Employees</NavLink>
          </EMLink>
          <EMLink>
            <NavLink to="/leaves">Leaves</NavLink>
          </EMLink>
          <ELink>
            <NavLink to="/employ">Apply Leaves</NavLink>
          </ELink>
          <ELink>
            <NavLink to="/leave">Requested Leaves</NavLink>
          </ELink>
          <ELink>
            <NavLink to="/salary">Employee Details</NavLink>
          </ELink>

          <CPMLink>
            <li>
              <NavLink to="/homePage">    Home    </NavLink>
            </li>
            <li className="mada">
            |
          </li>
          
            <li>
            <NavLink to="/admin/create-product">    Create Products    </NavLink>
            </li>
            <li className="mada">
            |
          </li>
           
            <li>
              <NavLink to="/admin/create-category">   Category   </NavLink>
            </li>
            <li className="mada">
            |
          </li>
            <li>
            <NavLink to="/admin/products">    Products    </NavLink>
            </li>
            </CPMLink>

           <CCTVLink>
            <li>
            <NavLink to="/admin/Ccreate-category">    Category    </NavLink>
            </li>
            <li>
              <NavLink to="/ChomePage">    CCTV Packages    </NavLink>
            </li>
           <li>
            <NavLink to="/admin/Ccreate-product">    Create Products    </NavLink>
            </li>
            <li>
            <NavLink to="/admin/Cproducts">    Products    </NavLink>
            </li>
</CCTVLink>
        </ul>
      </nav>
    </div>
  );
};

export default PageMenu;
