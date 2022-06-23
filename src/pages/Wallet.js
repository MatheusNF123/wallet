import React from 'react';
import Header from '../components/Header';
import Forms from '../components/Forms';
import Tabela from '../components/Tabela';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Forms />
        <Tabela />
      </>
    );
  }
}

export default Wallet;
