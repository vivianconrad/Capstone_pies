// Page was in an attempt to route between pages.
import { faColumns } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navigationBar/Navbar.js";

const Layout = () => {
	return (
		<>
			<div id="appLayout">
				<Outlet />
				<Navbar />
			</div>
		</>
	);
};

export default Layout;
