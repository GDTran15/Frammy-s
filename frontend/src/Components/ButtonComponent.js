


export function TabButton({children,redirectLink, activeCondition}){
    return (
        <li className="nav-item">
            <a href={redirectLink} className={`btn nav-button ${activeCondition ? 'active' : undefined}`}  >{children}</a>
         </li>
    )
};



