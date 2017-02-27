import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserStatus from './containers/UserStatus';
import { Layout, Sidebar, Content } from "./components/Layout";

class App extends Component {
  render() {
    return (
        <Layout>
            <Sidebar>
                <UserStatus />
            </Sidebar>
            <Content>
            </Content>
        </Layout>
    );
  }
}

export default App;
