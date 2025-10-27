import { Pagination } from "react-bootstrap"

export default function PagiComponent({page,totalPage,onChange}){
    return(
        <>
            <Pagination>
                
                {Array.from({length : totalPage}, (_,index) => (
                    <Pagination.Item key={index} active={index === page} onClick={() => onChange(index)} >
                     {index + 1}    
                     </Pagination.Item>
                
                )
                
                )}
                
            </Pagination>
        </>
    )
}