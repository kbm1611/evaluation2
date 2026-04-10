import React, { useEffect, useState } from "react";
import { findAllEmp, addEmp, delEmp, updEmp } from '../api/employeeAPI';

export default function EmployeeManager({deptList, empList, onDeptRefresh, onEmpRefresh}) {

  // 사원 등록
  const addEmployee = async (e) => {

    e.preventDefault();
    try {
      const emp_name = e.target.emp_name.value;
      const position = e.target.position.value;
      const dept_name = e.target.dept_name.value;
      const uploadFile = e.target.uploadFile.files[0];

      const formData = new FormData();
      formData.append('emp_name', emp_name);
      formData.append('position', position);
      formData.append('dept_name', dept_name);

      if (uploadFile) { formData.append('uploadFile', uploadFile); }
      await addEmp(formData);

      if(onDeptRefresh) onDeptRefresh();
      if(onEmpRefresh) onEmpRefresh();

      console.log(empList);

      alert('사원 등록 성공');
    } catch (error) {
      console.log('사원 등록 실패: ', error);
    }
  }

  // 사원 수정
  const updEmployee = async (emp_id) => {
    try {
      const emp_name = prompt('수정할 이름');
      const position = prompt('수정할 직급');

      const obj = {
        emp_id,
        emp_name,
        position
      }
      await updEmp(obj);

      if(onDeptRefresh) onDeptRefresh();
      if(onEmpRefresh) onEmpRefresh();

      alert('사원 수정 성공');
    } catch (error) {
      console.log('사원 수정 실패: ', error);
    }
  }

  // 사원 삭제
  const delEmployee = async (emp_id) => {
    try {
      const data = await delEmp(emp_id);

      if(onDeptRefresh) onDeptRefresh();
      if(onEmpRefresh) onEmpRefresh();

      alert('사원 삭제 성공');
    } catch (error) {
      console.log('사원 삭제 실패: ', error);
    }
  }

  return (
    <div className="main">
      {/* 사원 등록 */}
      <form className="form-box" onSubmit={ addEmployee }>
        <h3>사원 등록</h3>

        <div className="form-row">
          <input name="emp_name" type="text" placeholder="이름" />
          <input name="position" type="text" placeholder="직급" />
        </div>

        <div className="form-row">
          <select name="dept_name">
            {/* department함수 */}
            {deptList && deptList.length > 0 ? (
              deptList.map((dept) => (
                <option key={dept.dept_id}>{dept.dept_name}</option>
              ))
            ) : (
              <option disabled>부서를 추가하세요.</option>
            )}
          </select>
          <input name="uploadFile" type="file" />
        </div>

        <div className="form-action">
          <button type="submit" className="primary">등록</button>
        </div>
      </form>

      {/* 사원 목록 */}
      <div className="table-box">
        <h3>사원 전체 목록</h3>

        <table>
          <thead>
            <tr>
              <th>사진</th>
              <th>이름</th>
              <th>부서</th>
              <th>직급</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {empList.map((emp) => (
              <tr key={emp.emp_id}>
                <td><img className="profile-img" src={`${emp.profileImage}`} /></td>
                <td>{emp.emp_name}</td>
                <td>{emp.dept_name}</td>
                <td>{emp.position}</td>
                <td>
                <span className="edit" onClick={() => updEmployee(emp.emp_id)}>수정</span>
                <span className="delete" onClick={() => delEmployee(emp.emp_id)}>삭제</span>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}