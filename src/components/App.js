import 'normalize.css/normalize.css';
import 'styles/App.css';

import React from 'react';
import Link from 'react-router'

let yeomanImage = require('../images/yeoman.png');

class App extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">App</div>
        <Link to={'/'}>Main</Link>
        <Link to={'/feeds'}>Feeds</Link>
        <Link to={'/login'}>Login</Link>
        <div className="asd">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.defaultProps = {
};

export default App;
