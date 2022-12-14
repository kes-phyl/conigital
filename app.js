const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const date = new Date().toISOString();
const Json2csvParser = require("json2csv").Parser;
const cron = require('node-cron')
const fs = require('fs');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))
app.set('view engine', 'ejs')


///////////////////////Database connection and model....

mongoose.connect('mongodb://localhost:27017/expensesDB')

const expenseSchema =  {
    category: {
        type: String,
        enum: ['Entertainment', 'Transport', 'Groceries', 'Shopping', 'Other'],
        required: true
    },
    title: String,
    cost: Number,
    time: Date
}


const Expense = mongoose.model('expense', expenseSchema);

app.post('/', function(req,res){
    const newCategory = req.body.category;
    const newTitle = req.body.title;
    const newCost = req.body.cost;
    const expense = new Expense({
        category: newCategory,
        title: newTitle,
        cost: newCost,
        time: date
    })
    expense.save(function(err){
        if( !err){
            res.redirect('/expenses')
        }else{
            console.log(err)
        }
    })
})


/////////////////////////////////CREATING THE HOME ROUTE

app.get('/', function(req, res){
    
    res.render('index', {Expenses: 'Coginital Expense Manager'});
});



//expenses route...///////////////////////////////////////////////////////checek tghe idddddddddddddddddddd
app.get('/expenses', function(req,res){
    Expense.find({}, function(err, foundExpenses){
        if(!err){
           res.render('expenses', {Expenses: 'Coginital Expense Manager', foundExpenses: foundExpenses})
        }
    })
})



//635bf5d0e1c684be1c351a19  

//Downloading the database csv every 10min
 cron.schedule('*/10 * * * *', () => {
        
    Expense.find({}, function(err, foundExpenses){
        if(!err){
           
        console.log(foundExpenses);
        const json2csvParser = new Json2csvParser({ header: true });
        const csvData = json2csvParser.parse(foundExpenses);

        fs.writeFile("monthly_expense_fs.csv", csvData, function(error) {
          if (error) throw error;
          console.log("Write to monthly_expense_fs.csv successfully!");
        });



        }
    })



    ///////////////////////Empy the database delete all records

    Expense.deleteMany({}, function(err){
        if(!err){
            console.log('successfully deleted')
        }
    })



      });

///////////////////////.......................................GETTING RECEIPT WITH ID.....///////////////////////////////

app.get('/expenses/:id', function(req, res){
    const queriedReciept = req.params.id;
    Expense.find({_id: queriedReciept}, function(err, foundQueriedReciept){
        if(foundQueriedReciept){
            res.send(foundQueriedReciept)
        }else{
            console.log(err);
        }
    })
})






app.listen(3000,function(){
    console.log('Server running at port 3000!')
})