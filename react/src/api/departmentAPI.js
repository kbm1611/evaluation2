import axios from "axios"

// 전체 조회
export const findAllDept = async() => {
    const response = await axios.get("http://localhost:8080/api/department");
    return response.data;
}

// 등록
export const addDept = async(dept_name) => {
    const response = await axios.post("http://localhost:8080/api/department", { dept_name } );
    return response.data;
}

// 수정
export const updDept = async(obj) => {
    const response = await axios.put("http://localhost:8080/api/department", obj );
    return response.data;
}

// 삭제
export const delDept = async(dept_id) => {
    const response = await axios.delete(`http://localhost:8080/api/department?dept_id=${dept_id}`);
    return response.data;
}