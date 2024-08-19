import { useNavigate } from "react-router";
// import gym_rules from '../../Resources/gym_rules.jpg';
import '../../Page_Styling/rules.css'
function Rules(){

const navigate=useNavigate();

return(
<main>

<div className="rules">
<h1>Rules</h1>
      <ul className="gym-rules">
        <li>Always wipe down equipment after use.</li>
        <li>Return weights and equipment to their designated places.</li>
        <li>Respect others' personal space and time on equipment.</li>
        <li>Wear appropriate gym attire and footwear.</li>
        <li>No food or drinks (except water) allowed in workout areas.</li>
        <li>Report any damaged or malfunctioning equipment to staff immediately.</li>
        <li>Follow the gym’s code of conduct and etiquette at all times.</li>
      </ul>
    
      <section>
      <button onClick={()=>navigate('/home')} className="btn btn-primary">Home</button>
      <button onClick={()=>navigate('/register/User')} className="btn btn-secondary">Go to Registration</button>
    </section>
    </div>


   

</main>
)

}


export default Rules;