import React from "react";
import "../css/profile.css";

const Profile = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "Right",
				height: "100vh",
			}}
		>
			<section class="main">
				<h1>Settings</h1>
				<div class="profile" id="userIMG"></div>
				<input type="text" class="textBox" value="Thomas Rusch"></input>
				<h2>Display Settings</h2>
				<div class="displaySettings">
					<div class="accentColorRow">
						<div class="nochangeText">
							<p>Accent Color</p>
						</div>
						<div class="accentColor"></div>
					</div>
					<div class="categoryColumn">
						<div class="category" id="redcat">
							<p class="catName">Work</p>
						</div>
						<div class="category" id="bluecat">
							<p class="catName">School</p>
						</div>
						<div class="category" id="greencat">
							<p class="catName">Other</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Profile;
