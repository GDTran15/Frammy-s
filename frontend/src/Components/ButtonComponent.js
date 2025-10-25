import { Link } from "react-router-dom"


export function TabButton({children,redirectLink, activeCondition}){
    return (
        <li className="nav-item">
            <Link to={redirectLink} className={`btn nav-button ${activeCondition ? 'active' : undefined}`}  >{children}</Link>
         </li>
    )
};



