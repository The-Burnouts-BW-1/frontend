import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

import { Flex, Button, Spinner } from '@chakra-ui/core';

export const Player = () => {
  const [player, setPlayer] = useState([]);
  const [move, setMove] = useState(false);

  const movingPlayer = (i) => {
    setMove(!move);
    axiosWithAuth()
      .post('/api/adv/move', { direction: i })
      .then((res) => {
        setPlayer(res.data);
      })
      .catch((err) => {
        console.log('Error with sending dir', err.response);
      });
  };
  useEffect(() => {
    axiosWithAuth()
      .get('api/adv/init/', player)
      .then((res) => {
        console.log(res);
        setPlayer(res.data);
      })
      .catch((err) => {
        console.log('Error with init', err.response);
      });
  }, [move]);

  return (
    <Flex w='50%'>
      {/* player information */}
      <Flex flexDir='column' w='80%'>
        <Flex>
          <Flex h='300px' w='100%' justify='center' align='center'>
            <Button
              onClick={() => {
                movingPlayer('w');
              }}
            >
              West
            </Button>
            <Flex flexDir='column' mx='10px'>
              <Button
                mb={10}
                onClick={() => {
                  movingPlayer('n');
                }}
              >
                North
              </Button>
              <Button
                onClick={() => {
                  movingPlayer('s');
                }}
              >
                South
              </Button>
            </Flex>
            <Button
              onClick={() => {
                movingPlayer('e');
              }}
            >
              East
            </Button>
          </Flex>
        </Flex>
        <Flex border='1px' p='5' justify='center'>
          <Flex flexDir='column'>
            <h2>Welcome Back {player.name}</h2>
            <p>Current room: {player.description}</p>
            <Flex>
              <h3>Your inventory</h3>
            </Flex>
            {!player.inventroy ? (
              <p>Your inventory is empty</p>
            ) : (
              <p>{player.inventory}</p>
            )}
            <Flex flexDir='column'>
              <Flex>
                <h3>Players in this room</h3>
              </Flex>
              <Flex flexDir='column'>
                {!player.players ? (
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                  />
                ) : (
                  player.players.map((i) => <p key={i}>{i}</p>)
                )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
