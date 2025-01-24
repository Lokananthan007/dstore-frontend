import  './Footer.css';
import { FaRegCopyright } from "react-icons/fa";

function Footer (){
    return(
        <div id='footer'>
            <footer>
                <p className='p1'><FaRegCopyright/>2025 Dechro</p>
                <p className='p2'>Created By: Dechro</p>
            </footer>
        </div>
    );
};
export default Footer;