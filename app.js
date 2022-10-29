const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const date = new Date().toISOString();


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

// const expense = new Expense({
//     category: 'Entertainment',
//     title: 'Movie-Seeing',
//     cost: 500,
//     time: date
// })
// expense.save(function(err){
//     if(err){
//         console.log(err)
//     }else{
//         console.log('Successfully saved')
//     }
// })
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

app.get('/', function(req, res){
    
    res.render('index', {Expenses: 'Coginital Expense Manager'});
    // res.send('We are working on it... It will be ready on..' + date)
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





////////////////////////////////////////////////// Downloading the CSV //////////////////////////////////////////////


const newCsvo = function(){

    Project.find({}, function(err, foundReciepts){
       if(foundReciepts){
        for (i = 0; i < foundReciepts.length; i++){
            totalCost = foundReciepts[i].cost;
        }
        foundReciepts.forEach(function(receipt){

            let receiptTotal = receipt.cost;
            let receiptCategory = receipt.category;
            let receiptTitle = receipt.title;
            let costPercentage = (receiptTotal/totalCost) * 100;

            let receiptObject = {
                title: receiptCategory,
                cost: receiptTotal,
                costPercentage: costPercentage
            }

            console.log(projectObject);
            const json2csvParser = new Json2csvParser({ header: true });
            const csvData = json2csvParser.parse(projectObject);
    
            fs.writeFile("kes_mongodb_fs.csv", csvData, function(error) {
              if (error) throw error;
              console.log("Write to kes_mongodb_fs.csv successfully!");
            });
            let fileLocation = __dirname + '/kes_mongodb_fs.csv';
            console.log(fileLocation)








            
        })
       }


    })


}

///////////////ending of the function


app.listen(3000,function(){
    console.log('Server running at port 3000!')
})