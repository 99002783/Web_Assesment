
const app = require('express')();
const parser = require("body-parser");
const fs = require("fs");
const dir = __dirname;
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

let employees = [];

function readData(){
    const filename = "data.json"; 
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    employees = JSON.parse(jsonContent);
}

function saveData(){
    const filename = "data.json";
    const jsonData = JSON.stringify(employees);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}
app.get("/employees", (req, res)=>{
    readData();
    res.send(JSON.stringify(employees));    
})

app.get("/employees/:id", (req, res)=>{
    const empid = req.params.id;
    if(employees.length == 0){
        readData();
    }
    let foundRec = employees.find((e) => e.empId == empid);
    if(foundRec == null)
        throw "Employee not found";
    res.send(JSON.stringify(foundRec))
})

app.put("/employees", (req, res)=>{
    if(employees.length == 0)
        readData();
    let body = req.body;
    
    for (let index = 0; index < employees.length; index++) {
        let element = employees[index];
        if (element.empId == body.empId) {
            element.empName = body.empName;
            element.empAddress = body.empAddress;
            element.empSalary = body.empSalary;
            saveData();
            res.send("Employee updated successfully");
        }
    }
   .
})

app.post('/employees', (req, res)=>{
    if (employees.length == 0)
        readData();
    let body = req.body;
    saveData();
    res.send("Employee added successfully");
})
app.delete("/employees/:id", (req, res)=>{
  throw "Do it UR Self!!!!";  
})

app.listen(1234, ()=>{
    console.log("Server available at 1234");
})