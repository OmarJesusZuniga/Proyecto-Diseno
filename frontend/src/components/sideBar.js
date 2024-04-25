import React from 'react';
import '../components/sideBar.css'; // You can define your sidebar styles in this file

const Sidebar = ({s1, s2, s3}) => {

    const dejarPrimera = () =>{
        s1(true);
        s2(false);
        s3(false);
    }
    const dejarSegunda = () =>{
        s1(false);
        s2(true);
        s3(false);
    }
    const dejarTercera = () =>{
        s1(false);
        s2(false);
        s3(true);
    }


  return (
    <div className="sidebar">
      <h2>Menú</h2>
      <ul>
        <li><button onClick={dejarPrimera}>Option 1</button></li>
        <li><button onClick={dejarSegunda}>Option 2</button></li>
        <li><button onClick={dejarTercera}>Option 3</button></li>
        {/* Add more list items for your sidebar options */}
      </ul>
    </div>
  );
}

export default Sidebar;