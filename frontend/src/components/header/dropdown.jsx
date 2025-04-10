import {Button} from 'antd';
import { FaAngleDown } from "react-icons/fa6";

const Dropdown = () => {
return(
    <>
     <Button type="primary" className='countryDrop'> 
            <div className="info d-flex flex-column" >
                <span>Your Location</span>
                <span>India</span>
            </div>
            <span className='ml-auto'><FaAngleDown/></span>
        </Button>
    </>
)
}

export default Dropdown;