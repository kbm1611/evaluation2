import React, { useEffect, useState } from "react";
import { addDept, updDept, delDept } from '../api/departmentAPI';

export default function DepartmentManager({deptList, onDeptRefresh, onEmpRefresh}) {

  // 부서 등록
  const addDeptartment = async (e) => {
    try {
      e.preventDefault();

      const dept_name = e.target.dept_name.value;
      await addDept(dept_name);

      if(onDeptRefresh) onDeptRefresh();
      if(onEmpRefresh) onEmpRefresh();

      alert('부서 등록 성공');
    } catch (error) {
      console.log('부서 등록 실패: ', error);
      alert('중복된 부서명 불가');
    }

  }

  // 부서 수정
  const updDeptartment = async (dept_id) => {
    try {
      const dept_name = prompt('수정할 이름');

      const obj = {
        dept_name,
        dept_id
      }
      await updDept(obj);

      if(onDeptRefresh) onDeptRefresh();
      if(onEmpRefresh) onEmpRefresh();

      alert('부서 수정 성공');
    } catch (error) {
      console.log('부서 수정 실패: ', error);
    }
  }

  // 부서 삭제
  const delDepartment = async (dept_id) => {
    try {
      await delDept(dept_id);

      if(onDeptRefresh) onDeptRefresh();
      if(onEmpRefresh) onEmpRefresh();

      alert('부서 삭제 성공');
    } catch (error) {
      console.log('부서 삭제 실패: ', error);
      alert('부서 삭제 실패: 소속된 사원 존재');
    }
  }

  return (
    <div className="sidebar">
      <h3>부서 관리</h3>

      <form className="dept-input" onSubmit={addDeptartment}>
        <input name="dept_name" type="text" placeholder="신규 부서명 입력" />
        <button type="submit">추가</button>
      </form>

      <table className="dept-table">
        <thead>
          <tr>
            <th>부서명</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {deptList.map((dept) =>(
            <tr key={dept.dept_id}>
              <td>{dept.dept_name}</td>
              <td>
                <span className="edit" onClick={() => updDeptartment(dept.dept_id)}>수정</span>
                <span className="delete" onClick={() => delDepartment(dept.dept_id)}>삭제</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}