import React from 'react';
import { Outlet } from "react-router-dom";
import ModalComponent from '../components/ModalComponent';
import ToastComponent from '../components/ToastComponent';


const ContainerLayout: React.FC = () => {
  return (
    <section className={`container-full vh-100`}>

      <Outlet />
      
      <ModalComponent />
      <ToastComponent />
      <br /><br /><br /><br />
    </section>
  );
};

export default ContainerLayout;