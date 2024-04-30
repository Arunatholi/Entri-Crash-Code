import express from 'express';
import { addEmployees,countByAge,countByAgeGreaterThan,getEmployeesSortedByName } from '../Controller/employeeController.js';

const employeeRouter = express.Router();

employeeRouter.post('/',addEmployees)
employeeRouter.get('/countByAge',countByAge);
employeeRouter.get('/countByAgeGreaterThan/:age',countByAgeGreaterThan);
employeeRouter.get('/getEmployeesSortedByName',getEmployeesSortedByName)


export default employeeRouter