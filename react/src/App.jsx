import React, { useEffect, useState } from "react";
import "./App.css";
import DepartmentManager from "./pages/DepartmentManager";
import EmployeeManager from "./pages/EmployeeManager";
import { findAllDept } from './api/departmentAPI';
import { findAllEmp } from './api/employeeAPI';

export default function App() {
  const [deptList, setDeptList] = useState( [] );
  const [empList, setEmpList] = useState([]);

  // 부서 목록 출력
    const findAllDepartment = async () => {
      try {
        const dataList = await findAllDept();
        setDeptList(dataList);
  
      } catch (error) {
        console.log('부서 목록 출력 실패:', error);
      }
    }

    // 사원 출력
  const findAllEmployee = async () => {
    try {
      const dataList = await findAllEmp();
      setEmpList(dataList);
      console.log( dataList )

    } catch (error) {
      console.log('사원 목록 출력 실패:', error);
    }
  }

  // 초기 로딩
  useEffect(() => {
      findAllDepartment();
      findAllEmployee();
    }, []);

  return (
    <div className="page-wrapper">
      <div className="container">
        <h2>인사 관리 대시보드</h2>
        <p className="sub-title">부서, 사원 관리 시스템</p>

        <div className="layout">
          <DepartmentManager
          deptList={deptList}
          onDeptRefresh={findAllDepartment}
          onEmpRefresh={findAllEmployee}
          />
          <EmployeeManager 
          deptList={deptList}
          empList={empList}
          onDeptRefresh={findAllDepartment}
          onEmpRefresh={findAllEmployee}
          />
        </div>
      </div>
    </div>
  );
}