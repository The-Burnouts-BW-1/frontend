import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

import { Flex, Button } from '@chakra-ui/core';

export const Player = () => {
  const [player, setPlayer] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get('api/adv/init/', player)
      .then((res) => {
        console.log(res);
        setPlayer(res.data);
      })
      .catch((err) => {
        console.log('Error with init', err);
      });
  }, []);

  const movingPlayer = (i) => {
    axiosWithAuth()
      .post('/api/adv/move', { direction: i })
      .then((res) => {
        setPlayer(res.data);
      });
  };

  return (
    <Flex>
      <Flex>
        <Button
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
        <Button
          onClick={() => {
            movingPlayer('e');
          }}
        >
          East
        </Button>
        <Button
          onClick={() => {
            movingPlayer('w');
          }}
        >
          West
        </Button>
      </Flex>

      {/* player information */}
      <Flex>
        <Flex>
          <h2>{player.name}</h2>
          <p>{player.inventory}</p>
        </Flex>
      </Flex>
    </Flex>
  );
};
