import React from 'react';
import { Outlet } from "react-router-dom";
import ModalComponent from '../components/ModalComponent';
import ToastComponent from '../components/ToastComponent';


const ContainerLayout: React.FC = () => {
  return (
    <section className="container-fluid vh-100 p-0">
      <div className="row h-100">
        <div className="col-12">
          <Outlet />
          <ModalComponent />
          <ToastComponent />
          <br /><br /><br /><br />
        </div>
      </div>
    </section>
  );
};

export default ContainerLayout;