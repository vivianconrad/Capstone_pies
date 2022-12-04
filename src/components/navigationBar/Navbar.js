// https://www.geeksforgeeks.org/create-a-responsive-navbar-using-reactjs/

import React from 'react';
import "../../index.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
// import {
//     Nav,
//     NavLink,
//     Bars,
//     NavMenu,
//     NavBtn,
//     NavBtnLink,
// } from './NavbarElements';
import {
    Box,
    Image,
    Flex,
    Text
} from 'rebass';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icons} from "react-icons";
import {ReactComponent as HouseSolid} from '../../icons/house-solid.svg';
import {ReactComponent as UserSolid} from '../../icons/user-solid.svg';
import {ReactComponent as BasketSolid} from '../../icons/basket-shopping-solid.svg';
import {ReactComponent as CubesStackedSolid} from '../../icons/cubes-stacked-solid.svg';


// const Navbar = () => {
//     return (
//         <Flex flexwrap={'wrap'} color='white' bg='orange' alignItems='center'>
//             <Box px={2} py={2} width={1 / 3}>
//                 <NavLink to='../../pages/home.js' activeStyle>
                    // <div className={'main_icons'}>
                    //     <HouseSolid/>
                    //     <div className={'navbar_page_label'}>home</div>
                    // </div>
//                 </NavLink>
//             </Box>
//             <Box content-align={'center'} px={2} py={2} width={1 / 3}>
//                 <NavLink to='../../pages/stack.js'>
                    // <div className={'main_icons'}>
                    //     <CubesStackedSolid/>
                    //     <div className={'navbar_page_label'}>stack</div>
                    // </div>
//                 </NavLink>
//             </Box>
//             <Box px={2} py={2} width={1 / 3}>
//                 <NavLink to='../../pages/store.js' activeStyle>
//                     <div className={'main_icons'}>
//                         <BasketSolid/>
//                         <div className={'navbar_page_label'}>shop</div>
//                     </div>
//                 </NavLink>
//             </Box>
//             <Box content-align={'center'} px={2} py={2} width={1 / 3}>
//                 <NavLink to='../../pages/profile.js'>
//                     <div className={'main_icons'}>
//                         <UserSolid/>
//                         <div className={'navbar_page_label'}>profile</div>
//                     </div>
//                 </NavLink>
//             </Box>
//         </Flex>
//     );
// };

function Navbar(){
    return(
        <nav id="appNavBar">
            <ul>
                <li className={'navbar_button'}>
                    <Link to='/'>
                        <HouseSolid/>
                        <div className={'navbar_page_label'}>home</div>
                    </Link>
                </li>
                <li className={'navbar_button'}>
                    <Link to="/stack">
                        <CubesStackedSolid/>
                        <div className={'navbar_page_label'}>stack</div>
                    </Link>
                </li>
                <li className={'navbar_button'}>
                    <Link to="/store">
                        <BasketSolid/>
                        <div className={'navbar_page_label'}>shop</div>
                    </Link>
                </li>
                <li className={'navbar_button'}>
                    <Link to="/profile">
                        <UserSolid/>
                        <div className={'navbar_page_label'}>profile</div>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;