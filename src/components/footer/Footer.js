import  './Footer.css';
import { FaRegCopyright } from "react-icons/fa";

function Footer (){
    return(
        <div id='footer'>
            <footer>
                <p className='p1'><FaRegCopyright/>2025 D-Store</p>
                <p className='p2'>Created By: Lokananthan & Nithyasree</p>
            </footer>
        </div>
    );
};
export default Footer;