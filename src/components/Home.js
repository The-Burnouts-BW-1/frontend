import React from 'react';
import { Player } from './Player';
import { Map } from './Map';
import { Button, Flex } from '@chakra-ui/core';

export const Home = ({ history }) => {
  const logout = () => {
    localStorage.clear('token');
    history.push('/');
  };

  return (
    <Flex justify='center'>
      <Flex maxW='2000px' w='2000px' h='100vh' flexDir='column'>
        <header>
          <Flex w='100%' justify='space-between' align='center' mt='2%' mb='7%'>
            <h1>The Burnouts</h1>
            <Flex>
              <Button onClick={logout}>Logout</Button>
            </Flex>
          </Flex>
        </header>
        <Flex flexDir='row'>
          {/* <Flex w='50%'>I AM THE MAP</Flex> */}

          <Map />
          <Player />
        </Flex>
      </Flex>
    </Flex>
  );
};
