import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { Graph } from 'react-d3-graph';

import { Player } from './Player';
import { Spinner } from '@chakra-ui/core';

export const Map = () => {
  const [room, setRoom] = useState([]);

  // hit the room end point to get room info
  useEffect(() => {
    axiosWithAuth()
      .get('api/adv/rooms', room)
      .then((res) => {
        setRoom(res.data);
      })
      .catch((error) => {
        console.log('Error with rooms', error);
      });
  }, []);

  //create 2 place array for the graph to build the nodes
  let place = [];

  if (room.rooms && room.rooms.length > 0) {
    console.log(room.rooms);
    let newRoom = room.rooms.map((i) => {
      console.log('map', i);
      return { id: i.id, x: i.x, y: i.y };
    });
    place = newRoom;
  }

  let place2 = [];
  if (room.rooms && room.rooms.length > 0) {
    let newRoom2 = room.rooms.map((i) => {
      return { source: i.id, target: i.targets[0] };
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
    height: 500,
    highlightDegree: 1,
    highlightOpacity: 1,
    linkHighlightBehavior: false,
    maxZoom: 8,
    minZoom: 0.1,
    nodeHighlightBehavior: false,
    panAndZoom: false,
    staticGraph: false,
    staticGraphWithDragAndDrop: false,
    width: 900,
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
  if (!room.rooms) {
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
      <div>
        <div>
          <Graph id='graph-id' data={roomData} config={myConfig} />
        </div>
        <Player />
      </div>
    );
  }
};
