import { Pagination } from "react-bootstrap"

export default function PagiComponent({page,totalPage,onChange}){
    return(
        <>
            <Pagination>
                <Pagination.Prev disabled={page === 0} onClick={() => onChange(page -1)}/>
                {Array.from({length : totalPage}, (_,index) => (
                    <Pagination.Item key={index} active={index === page} onClick={() => onChange(index)} >
                     {index + 1}    
                     </Pagination.Item>
                
                )
                
                )}
                <Pagination.Next disabled={page === totalPage -1 } onClick={() => onChange(page +1)}/>
            </Pagination>
        </>
    )
}