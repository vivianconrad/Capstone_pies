// https://www.geeksforgeeks.org/create-a-responsive-navbar-using-reactjs/

import React from 'react';
import "../../css/index.css";
import {Link} from 'react-router-dom';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from './NavbarElements';
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


const Navbar = () => {
    return (
        <Flex flexwrap={'wrap'} color='white' bg='orange' alignItems='center'>
            <Box px={2} py={2} width={1 / 3}>
                <NavLink to='../../pages/home.js' activeStyle>
                    <div className={'main_icons'}>
                        <HouseSolid/>
                    </div>
                </NavLink>
            </Box>
            <Box px={2} py={2} width={1 / 3}>
                <NavLink to='../../pages/store.js' activeStyle>
                    <div className={'main_icons'}>
                        <BasketSolid/>
                    </div>
                </NavLink>
            </Box>
            <Box content-align={'center'} px={2} py={2} width={1 / 3}>
                <NavLink to='../../pages/profile.js'>
                    <div className={'main_icons'}>
                        <UserSolid/>
                    </div>
                </NavLink>
            </Box>
        </Flex>
    );
};

export default Navbar;