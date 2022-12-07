import React, { Component } from "react";
// import "../css/store.css";

export default class Store extends Component {
	render() {
		return (
			<div className={"app_page"}>
				<div className="top_header">
					<h1 class="title">Shop</h1>{" "}
				</div>
				<h2>You have {localStorage.getItem("coins")} coins</h2>
				<div class="container">
					<div class="card">
						<img
							class="card--avatar"
							src="../images/strawhat.png"
							alt="straw hat collectable"
							width={"300"}
						/>
						<h1 class="card--title">Straw Hat</h1>
						<h2>Price: 42 Coins</h2>
						<button class="card--click">Equip</button>
					</div>
				</div>
				<div class="container">
					<div class="card">
						<img
							class="card--avatar"
							src="../images/TopHat.png"
							alt="top hat collectable"
							width={"300"}
						/>
						<h1 class="card--title">Top Hat</h1>
						<h2>Price: 64 Coins</h2>
						<button class="card--click">Equip</button>
					</div>
				</div>
				<div class="container">
					<div class="card">
						<img
							class="card--avatar"
							src="../images/BowlerHat.png"
							alt="Bowler hat collectable"
							width={"300"}
						/>
						<h1 class="card--title">Bowler Hat</h1>
						<h2>Price: 610 Coins</h2>
						<button class="card--click">Equip</button>
					</div>
				</div>
			</div>
		);
	}
}
