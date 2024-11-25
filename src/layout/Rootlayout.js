import React from "react";
import { Outlet } from "react-router-dom";
import Adminmenubar from "../components/admin/Adminmenubar";
function Rootlayout(){
    return(
        <>
        <Adminmenubar/>
        <Outlet/>
        </>
    );

}
export default Rootlayout;