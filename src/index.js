import React from "react";
// import ReactDOM from 'react-dom';
import "./css/index.css";
// import App from './App';

import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/home";
import Stack from "./pages/stack";
import Store from "./pages/store";
import Profile from "./pages/profile";

// const DATA = [
//     { id: "todo-0", name: "Eat", completed: true, category: "Personal"},
//     { id: "todo-1", name: "Sleep", completed: false, category: "Learning" },
//     { id: "todo-2", name: "Repeat", completed: false, category: "Work" }
// ];

// ReactDOM.render(
//     <React.StrictMode>
//         <App tasks={DATA} />
//     </React.StrictMode>,
//     document.getElementById('root')
// );

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="stack" element={<Stack />} />
					<Route path="store" element={<Store />} />
					<Route path="profile" element={<Profile />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

ReactDOM.render(<App />, document.getElementById("root"));
// root.render(<App />);
