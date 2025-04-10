import './styles.css';
import { Link } from "react-router-dom";
import Logo from '../../assets/logo.png';
import Dropdown from './dropdown.jsx';
import { FaSearch } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { IoBagOutline } from "react-icons/io5";
import { Button } from 'antd';

const Header = () => {
    return(
        <>
<div className="header-wrapper">
    <div className="top-strip header-bg">
        <div className="container">
            <p className="mb-0 mt-0">Orders may be delayed due to the ongoing supply chain issues</p>
        </div>
    </div>
    
    <div className="header">
        <div className="container">

        <div className="row justify-content-between align-items-center">
  {/* Left: Logo + Location */}
  <div className="d-flex align-items-center col-auto logo-location">
    <Link to={"/"}><img src={Logo} alt="logo" /></Link>
    <Dropdown />
  </div>

  {/* Center: Search Bar (Flexible Width) */}
  <div className="col search-wrapper">
    <div className="header-search">
      <input type="text" placeholder='Search for products' />
      <Button><FaSearch /></Button>
    </div>
  </div>

  {/* Right: User + Cart */}
  <div className="col-auto d-flex align-items-center part-3">
    <Button className='circle mr-3'><FiUser /></Button>
    <div className="cartTab d-flex align-items-center">
      <span className='price'>$3.24</span>
      <div className="position-relative ml-2">
        <Button className='circle'><IoBagOutline /></Button>
        <span className='count d-flex align-items-center justify-content-center'>1</span>
      </div>
    </div>
  </div>
</div>


        </div>
    </div>
</div>
        </>
    )
}

export default Header;