import React, { Fragment } from 'react';
import NavBar from '../../components/Public/NavBar';
import Footer from '../../components/Public/Footer';
import '../../style/public.css';

function PublicLayout(props) {
  return (
    <Fragment>
      <NavBar/>
      <div className="main-public-layout p-4">{props.children}</div>
      <Footer />
    </Fragment>
  );
}

export default PublicLayout;
