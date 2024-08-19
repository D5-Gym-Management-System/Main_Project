import { useNavigate } from "react-router"
import '../../Page_Styling/table.css'

function Gymtiming(){
const navigate=useNavigate();

    return(
        <body id="timingbody">
        <main className="container">
    <div className="plans"> 
        <h1>Gym Time</h1>
    <table className="table table-dark table-borderless">
        <thead> 
            <tr>
                <th>Timings</th>
                <th>Description</th>
             
            </tr>
        </thead>

        <tbody>

        <tr className="rowplans">
                <td>8AM - 12PM</td>
                <td> Open to ALL </td>
                
            </tr>
            <tr className="rowplans">
                <td>2PM - 4PM</td>
                <td> Only Ladies! </td>
                
            </tr>
            <tr className="rowplans">
                <td>5PM - 9PM</td>
                <td> Subscribers Only </td>
               
            </tr>
        </tbody>
    </table>
    <section>
    <button onClick={()=>navigate('/home')} className="btn btn-primary">Home</button>
    <button onClick={()=>navigate('/register/User')} className="btn btn-secondary">Go to Registration</button>
    </section>
    </div>
    </main>
    </body>
    )
}

export default Gymtiming;