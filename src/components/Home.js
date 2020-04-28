import React, { useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

export const Home = () => {
  useEffect(() => {
    axiosWithAuth()
      .get('api/adv/init/')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div> Sneaky Sneaky</div>;
};
