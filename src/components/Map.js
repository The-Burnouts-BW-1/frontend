import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { Graph } from 'react-d3-graph';

import { Spinner, Flex } from '@chakra-ui/core';

export const Map = () => {
  const [room, setRoom] = useState([]);

  // hit the room end point to get room info
  useEffect(() => {
    axiosWithAuth()
      .get('api/adv/rooms', room)
      .then((res) => {
        //console.log('map', res.data.data);
        setRoom(res.data);
      })
      .catch((err) => {
        console.log('Error with rooms', err.response);
      });
  }, []);

  //create 2 place array for the graph to build the nodes
  let place = [];

  if (room.data && room.data.length > 0) {
    //console.log(room.data);
    let newRoom = room.data.map((i) => {
      console.log('map', i);
      return { id: i.id, x: i.x, y: i.y };
    });
    place = newRoom;
  }

  let place2 = [];
  if (room.data && room.data.length > 0) {
    let newRoom2 = room.data.map((i) => {
      if (i.room_id === 0) {
        i.room_id = 1;
      }
      return { source: i.id, target: i.room_id };
    });
    place2 = newRoom2;
  }

  const roomData = {
    nodes: place,
    links: place2,
  };

  const myConfig = {
    automaticRearrangeAfterDropNode: false,
    collapsible: false,
    directed: false,
    focusAnimationDuration: 0.75,
    focusZoom: 1,
    height: 1200,
    highlightDegree: 1,
    highlightOpacity: 1,
    linkHighlightBehavior: false,
    maxZoom: 8,
    minZoom: 0.1,
    nodeHighlightBehavior: false,
    panAndZoom: false,
    staticGraph: false,
    staticGraphWithDragAndDrop: false,
    width: 1440,
    d3: {
      alphaTarget: 0.05,
      gravity: -100,
      linkLength: 100,
      linkStrength: 1,
    },
    node: {
      color: '#d3d3d3',
      fontColor: 'black',
      fontSize: 12,
      fontWeight: 'bold',
      highlightColor: 'SAME',
      highlightFontSize: 8,
      highlightFontWeight: 'normal',
      highlightStrokeColor: 'SAME',
      highlightStrokeWidth: 'SAME',
      labelProperty: 'id',
      mouseCursor: 'pointer',
      opacity: 1,
      renderLabel: true,
      size: 200,
      strokeColor: 'none',
      strokeWidth: 1.5,
      svg: '',
      symbolType: 'circle',
    },
    link: {
      color: '#d3d3d3',
      fontColor: 'black',
      fontSize: 8,
      fontWeight: 'normal',
      highlightColor: '#d3d3d3',
      highlightFontSize: 8,
      highlightFontWeight: 'normal',
      labelProperty: 'label',
      mouseCursor: 'pointer',
      opacity: 1,
      renderLabel: false,
      semanticStrokeWidth: false,
      strokeWidth: 1.5,
      markerHeight: 6,
      markerWidth: 6,
    },
  };

  // loading spinner
  if (!room.data) {
    return (
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    );
  } else {
    return (
      <Flex w='100%'>
        <Graph id='graph-id' data={roomData} config={myConfig} />
      </Flex>
    );
  }
};
