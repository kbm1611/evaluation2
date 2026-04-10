import axios from "axios"

export const findAllEmp = async() => {
    const response = await axios.get("http://localhost:8080/api/employee");
    return response.data;
}

export const addEmp = async(formData) => {
    const response = await axios.post(
        "http://localhost:8080/api/employee",
        formData
    );
    return response.data;
}

export const updEmp = async(obj) => {
    const response = await axios.put("http://localhost:8080/api/employee", obj);
    return response.data;
}

export const delEmp = async(emp_id) => {
    const response = await axios.delete(`http://localhost:8080/api/employee?emp_id=${emp_id}`);
    return response.data;
}