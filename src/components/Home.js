// Home.js

import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Employees from './Employees';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {
  const [Data, setData] = useState('');
  const [id, setId] = useState(0);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(Employees);
  }, []);

  const handleEdit = (id) => {
    const dt = Data.filter((employee) => employee.id === id);
    setId(id);
    setFirstName(dt[0].firstName);
    setLastName(dt[0].lastName);
    setAge(dt[0].age);
    setIsUpdate(true);
  };

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm('Are you sure to Delete')) {
        const dt = Data.filter((item) => item.id !== id);
        setData(dt);
      }
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();

    let error = '';

    if (firstname === '') {
      error += 'Enter FirstName : ';
    }
    if (lastname === '') {
      error += 'Enter LastName : ';
    }
    if (parseInt(age, 10) < 1) {
      error += 'Enter Age : ';
    }
    if (error !== '') {
      alert(error);
    } else {
      const dt = [...Data];
      const newEmployee = {
        id: Data.length + 1,
        firstName: firstname,
        lastName: lastname,
        age: age,
      };
      dt.push(newEmployee);
      setData(dt);
      handleClear();
    }
  };

  const handleUpdate = () => {
    const index = Data.map((employee) => {
      return employee.id;
    }).indexOf(id);

    const dt = [...Data];
    dt[index].firstName = firstname;
    dt[index].lastName = lastname;
    dt[index].age = age;

    setData(dt);
    handleClear();
  };

  const handleClear = () => {
    setId(0);
    setFirstName('');
    setLastName('');
    setAge(0);
    setIsUpdate(false);
  };

  return (
    <>
      <div className='container'>
        <div>
          <label className='form-input'>FirstName :
            <input type="text" required='true' placeholder='Enter First Name' value={firstname} onChange={(e) => setFirstName(e.target.value)} />
          </label>
        </div>
        <div>
          <label className='form-input'>LastName :
            <input type="text" placeholder='Enter Last Name' value={lastname} onChange={(e) => setLastName(e.target.value)} />
          </label>
        </div>
        <div>
          <label className='form-input'>Age :
            <input type="text" placeholder='Enter Age' value={age} onChange={(e) => setAge(e.target.value)} />
          </label>
        </div>
        <div className='btns'>
          {
            isUpdate === false ?
            <button className='btn btn-create' onClick={(e) => handleCreate(e)}>Create</button>
            : <button className='btn btn-update' onClick={handleUpdate}>Update</button>
            }
          <button className='btn btn-clear' onClick={handleClear}>Clear</button>
        </div>
      </div>

      <div className='table-container'>
        <Table className='table table-hover'>
          <thead>
            <th>Sr.no </th>
            <th>Id</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Age</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {
              Data.length > 0 ?
                Data.map((employee, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{employee.id}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.age}</td>
                    <td>
                      <Button className='btn btn-edit' onClick={() => handleEdit(employee.id)}>Edit</Button>&nbsp;
                      <Button className='btn btn-delete' onClick={() => handleDelete(employee.id)}>Delete</Button>
                    </td>
                  </tr>
                ))
                : 'No Record Found'
            }
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Home;
