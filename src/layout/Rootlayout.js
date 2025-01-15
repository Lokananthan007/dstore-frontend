import React from "react";
import Adminsidebar from "../components/sidebars/Adminsidebar";
import Empsidebar from "../components/sidebars/Empsidebar";
import { Outlet } from "react-router-dom";
function Rootlayout(){
    return(
        <>
        <Adminsidebar/>
        <Empsidebar/>
        <Outlet/>
        </>
    );

}
export default Rootlayout;