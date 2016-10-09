import React from 'react';
import { Media, PageHeader } from 'react-bootstrap';


import YeoMan from '../images/about.png';

class About extends React.Component {
  render() {
    return (
      <div className="page">
        <PageHeader>About</PageHeader>
        <Media>
         <Media.Left align="top">
           <img width={64} height={64} src={YeoMan} alt="Image"/>
         </Media.Left>
         <Media.Body>
           <Media.Heading>Stuff</Media.Heading>
           <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>

           <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
         </Media.Body>
       </Media>
      </div>
    );
  }
}

export default About;