import Employee from "../models/empolyeeModel.js";


const addEmployees = async(req,res) =>{
    try {
      await Employee.create([

        {name: 'John', age: 59, rank: "captain"},
        {name: 'red berry', age: 29, rank: "commander"},
        {name: 'orange', age: 28, rank: "Lieutenant commander"},
        {name: 'jerry tom', age: 29, rank: "Lieutenant"},
        {name: 'green', age: 24, rank: "Lieutenant"}
      ])

      res.status(201).send("Employees added")

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }
}

const countByAge = async (req,res)=>{
    try {
        const records = await Employee.aggregate([
            {
                $group:
                {
                    _id:"$age",
                    count:{$sum:1}
                }
            }
        ])
        res.status(200).json(records)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }
}

const countByAgeGreaterThan = async(req,res)=>{
    try {
        const age = Number(req.params.age)
        const records = await Employee.aggregate([

            {
                $match:{age:{$gt:age}}
            },
            {
                $group:
                {
                    _id:"$age",
                    count:{$sum:1}
                }
            }
        ]);

        res.status(200).json(records)

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"}) 
    }
}

const getEmployeesSortedByName =async(req,res)=>{
    try {
        const records = await Employee.aggregate([
            {$sort:{name:-1}},
            {$limit:4},
            {
                $project:{
                    _id:0,
                    EmployeeName:"$name",
                    rank:1
                }
            }
        ])

        res.status(200).json(records)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"}) 
    }
}


export {addEmployees,countByAge,countByAgeGreaterThan,getEmployeesSortedByName}



