import React from 'react';
import { Map } from './Map';
import { Button, useColorMode, Flex } from '@chakra-ui/core';

export const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex>
      <header>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
      </header>

      {/* <Map /> */}
    </Flex>
  );
};
