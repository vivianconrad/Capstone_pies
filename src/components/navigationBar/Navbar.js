// https://www.geeksforgeeks.org/create-a-responsive-navbar-using-reactjs/

import React from 'react';
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
    Card,
    Image,
    Heading,
    Flex,
    Text
} from 'rebass';

const Navbar = () => {
    return (
        <Flex flexwrap={'wrap'} color='white' bg='black' alignItems='center'>
            <Box px={2} py={2} width={1 / 3}>
                <NavLink to='/home' activeStyle>Home</NavLink>
            </Box>
            <Box px={2} py={2} width={1 / 3}>
                <NavLink to='/home' activeStyle>
                    <Image
                        src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vulture.com%2F2020%2F08%2Favatar-creators-leave-netflix-remake.html&psig=AOvVaw1zYIeDWDfLDc9HU87OFU79&ust=1669592686914000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCJimqcqDzfsCFQAAAAAdAAAAABAE"
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 9999,
                        }}
                    />
                </NavLink>
            </Box>
            <Box px={2} py={2} width={1/3}>
                <NavLink to='/signin'>Sign In</NavLink>
            </Box>
        </Flex>
    );
};

export default Navbar;