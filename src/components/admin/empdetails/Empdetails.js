import '../empdetails/Empdetails.css';

function Empdetdils(){
    return(
        <div className="main-content">
            <div id='Empdetdils'>
                <div className='row'>
                    <h1>Employee Registration</h1>
                    <form>
                        <lable>First Name :</lable>
                        <input type="text"></input>
                        <lable>Last Name :</lable>
                        <input type="text"></input>
                        <lable>Mobile Number :</lable>
                        <input type="number"></input>
                        <lable>Alternate Number :</lable>
                        <input type="number"></input>
                        <lable>Date Of Birth :</lable>
                        <input type="date"></input>
                        <lable>E-mail Id :</lable>
                        <input type="email"></input>
                        <lable>Aadhar Number :</lable>
                        <input type="number"></input>
                        <lable>Pan Card Number :</lable>
                        <input type="number"></input>
                        <lable>Designation: </lable>
                        <input type='text'></input>
                        <lable>Emp Id : </lable>
                        <input type='text'></input>
                        <lable>Password : </lable>
                        <input type="password"></input>
                        <h1>Address</h1>
                        <input type="text" placeholder="Line 1"></input>
                        <input type="text" placeholder="Line 2"></input>
                        <input type="text" placeholder="City"></input>
                        <input type="text" placeholder="State"></input>
                        <input type="number" placeholder="Zip Code"></input>
                        <h1>Bank Details</h1>
                        <lable>Bank Name : </lable>
                        <input type="text"></input>
                        <lable>Branch : </lable>
                        <input type="text"></input>
                        <lable>Account Number : </lable>
                        <input type="number"></input>
                        <lable>IFSC Code : </lable>
                        <input type="number"></input>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Empdetdils;
