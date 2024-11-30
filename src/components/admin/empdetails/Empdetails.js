import '../empdetails/Empdetails.css';

function Empdetdils() {
    const preventScroll = (e) => {
        e.target.blur(); 
    };

    return (
        <div className="main-content">
            <div id="Empdetdils">
                <div className="row">
                    <h1>Employee Registration</h1>
                    <form>
                        <label>First Name:</label>
                        <input type="text" />
                        <label>Last Name:</label>
                        <input type="text" />
                        <label>Mobile Number:</label>
                        <input type="number" onWheel={preventScroll} />
                        <label>Alternate Number:</label>
                        <input type="number" onWheel={preventScroll} />
                        <label>Date Of Birth:</label>
                        <input type="date" />
                        <label>E-mail Id:</label>
                        <input type="email" />
                        <label>Aadhar Number:</label>
                        <input type="number" onWheel={preventScroll} />
                        <label>Pan Card Number:</label>
                        <input type="number" onWheel={preventScroll} />
                        <label>Date Of Joining:</label>
                        <input type="date" />
                        <label>Designation:</label>
                        <input type="text" />
                        <label>Emp Id:</label>
                        <input type="text" />
                        <label>Password:</label>
                        <input type="password" />
                        <h1>Address</h1>
                        <input type="text" placeholder="Line 1" />
                        <input type="text" placeholder="Line 2" />
                        <input type="text" placeholder="City" />
                        <input type="text" placeholder="State" />
                        <input type="number" placeholder="Zip Code" onWheel={preventScroll} />
                        <h1>Bank Details</h1>
                        <label>Bank Name:</label>
                        <input type="text" />
                        <label>Branch:</label>
                        <input type="text" />
                        <label>Account Number:</label>
                        <input type="number" onWheel={preventScroll} />
                        <label>IFSC Code:</label>
                        <input type="text" />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Empdetdils;
