import { useNavigate } from "react-router"
import '../../Page_Styling/table.css'
import '../../Page_Styling/plans.css'

function Plans(){
const navigate=useNavigate();

    return(
        <main id="plansmain">

    <div className="container"> 
        <h1>Subscription Plans</h1>


    <table className="table ">
        <thead className="table-dark"> 
            <tr>
                <th>Plan Name</th>
                <th>Description</th>
                <th> Price</th>
                <th>Buy</th>
            </tr>
        </thead>

        <tbody>

        <tr className="rowplans table-secondary">
                <td>Platinum</td>
                <td>Access to all gym facilities, group classes, and a personal trainer.</td>
                <td>₹699</td>
                <td><button onClick={()=>navigate('/register')} className="btn btn-info">Buy Now</button></td>
            </tr>
            <tr className="rowplans table-secondary">
                <td>Gold</td>
                <td>All Gold benefits plus unlimited spa services and premium equipment access.</td>
                <td>₹499</td>
                <td><button onClick={()=>navigate('/register')} className="btn btn-info">Buy Now</button></td>
            </tr>
            <tr className="rowplans table-secondary">
                <td>silver</td>
                <td>Access to gym facilities and group classes with limited equipment use.</td>
                <td>₹299</td>
                <td><button onClick={()=>navigate('/register')} className="btn btn-info">Buy Now</button></td>
            </tr>
        </tbody>
    </table>
    <section>
    <button onClick={()=>navigate('/home')} className="btn btn-primary">Home</button>
    <button onClick={()=>navigate('/register')} className="btn btn-secondary">Go to Registration</button>
    </section>
    </div>
    </main>
    )
}

export default Plans;