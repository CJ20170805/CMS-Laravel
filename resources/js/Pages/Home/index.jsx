import React from 'react';
import './home.scss'
import MainLayout from '@/Layouts/MainLayout'
import { Head } from '@inertiajs/react'

const Home = ({auth}) => {
  return (
    <MainLayout auth={auth}>
      <Head title="Home" />
      <div>Home</div>
    </MainLayout>
  );
};
export default Home;