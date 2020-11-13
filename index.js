const mongoose=require('mongoose');

//Map Global Promise - get rid of warning
mongoose.Promise=global.Promise;

//Connect to db
try{
    const db = mongoose.connect('mongodb://localhost:27017/customercli',{ useNewUrlParser: true,  useUnifiedTopology: true },(err, conn)=>{
    if (err) throw err;
});

}catch(e){
    console.info('error found')
}


 //Import Model
 const customerModel=require('./models/customerModel');

 //Add Customer
 const addCustomer=(customer)=>{
     customerModel.create(customer).then(customer=>{
         console.info('New Customer Added');
        db.close();        
     });
 }

 //Find Customer
 const findCustomer=(name)=>{ 
    //Make case-insensitive
    const caseInsenstiveName=new RegExp(name,'i');
    customerModel.find({
        $or: [{firstname:caseInsenstiveName},{lastname:caseInsenstiveName}]
    }).then(customer=>{
        console.info(customer);
        console.info(`${customer.length} matches`);
        db.close();
    })
 }

 //Update Customer
 const updateCustomer=(_id, customer)=>{
     customerModel.update({_id},customer).then(customer=>{
         console.info('Customer Updated');
         db.close();
     })
 }

 //Remove Customer
 const removeCustomer=(_id)=>{
     customerModel.remove({_id}).then(()=>{
         console.info('Customer removed');
         db.close();
     })
 }

 //List Customers
 const listCustomer=()=>{
     customerModel.find().then(customers=>{
         console.info(customers);
         console.info(`${customers.length} customers`);
         db.close();
     })
 }

 //Export Methods
 module.exports={
     addCustomer,
     findCustomer,
     updateCustomer,
     removeCustomer,
     listCustomer
 }