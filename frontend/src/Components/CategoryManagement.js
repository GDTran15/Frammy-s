import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table,Modal } from "react-bootstrap";
import CategoryForm from "./CategoryForm";

export default function CategoryManagement(){
    const [categories,setCategories] = useState([]);
    const [updateOpen,setUpdateOpen] = useState(false);
    const [addOpen,setAddOpen] = useState(false);
    const [updateData,setUpdateData] = useState("");
    const token = localStorage.getItem("token");
    const fetchCategory = () =>{
        axios.get("http://localhost:8080/categories",{
            headers:{
            "Authorization": `Bearer ${token}`}
        })
        .then((res) => {
            console.log(res);
            setCategories(res.data.data);
        })
    }
    useEffect(() => fetchCategory(),[token]);
    const handleUpdate = (category) => {
        setUpdateOpen(true);
        setUpdateData(category)
    }
    const handleDelete = (id) =>{
        axios.delete(`http://localhost:8080/categories/${id}`,{
            headers:{
            "Authorization": `Bearer ${token}`}
        }).then((res) =>{
            alert(res.data.data)
            fetchCategory();
        })
    }
    return(
        <>
        <Modal show={addOpen} onHide={() => setAddOpen(false)} animation={false}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        <Modal.Header closeButton>
                        <Modal.Title>Add Category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><CategoryForm  usage="Add" fetchCategory={fetchCategory}/> </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={() => setAddOpen(false)}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
        
        <Modal show={updateOpen} onHide={() => setUpdateOpen(false)} animation={false}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        <Modal.Header closeButton>
                        <Modal.Title>Update Category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><CategoryForm title="Update Category" usage="Update" fetchCategory={fetchCategory} currentCategory={updateData}/> </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={() => setUpdateOpen(false)}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
        
        
        <div className="container">
            <div className="row bg-white mt-3 rounded-3 py-3">
                <div className="col-12">
                    <Button variant="warning" className="w-100" onClick={() => setAddOpen(true)}>Add Category</Button>
                </div>
                
            </div>
        </div>
        <section>
            <div className="container">
                <div className="row bg-white mt-3 rounded-3 py-3">
                    <div className="col overflow-y-auto" style={{ maxHeight: "300px"}}>
                    <Table  bordered  size="sm"  >
                        <thead className="position-sticky top-0 ">
                            <tr>
                            <th className="ps-3 bg-body-secondary">List of Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.categoryId} >
                                    <td className="d-flex align-items-center justify-content-between ps-3">
                                        {category.categoryName}
                                        <div className="d-flex gap-2">
                                            <Button variant="warning" size="sm" onClick={() => handleUpdate(category)}>Update</Button>
                                            <Button variant="danger" size="sm" onClick={() => handleDelete(category.categoryId)}>Delete</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>
                    </div>
                </div>
            </div>
        </section>
    
        
        </>
    )
}