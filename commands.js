#!/usr/bin/env node

const program=require('commander');
const {prompt}=require('inquirer');

const{
    addCustomer,
    findCustomer, 
    updateCustomer,
    removeCustomer,
    listCustomer
}=require('./index');

//Customer Questions

const questions=[
    {
        type:'input',
        name:'firstname',
        message:'customer first name'
    },
    {
        type:'input',
        name:'lastname',
        message:'customer last name'
    },
    {
        type:'input',
        name:'phone',
        message:'customer phone number'
    },
    {
        type:'input',
        name:'email',
        message:'customer email'
    },
]

program.version('1.0.0').description('Client Management System');

//Add Command
program.command('add').alias('a').description('Add a Customer').action(()=>{
    prompt(questions).then(answer=> addCustomer(answer))
})

//Find Command
program.command('find <name>').alias('a').description('Find Customer').action(name=>findCustomer(name))

//Update Command
program.command('update <_id>').alias('u').description('Update Customer').action(_id=>{
    prompt(questions).then(answers=>updateCustomer(_id,answers))
})

//Remove Command
program.command('remove <_id>').alias('r').description('Remove Customer').action(_id=>removeCustomer(_id))

//List Command
program.command('list').alias('l').description('List All Customers').action(()=>listCustomer())

program.parse(process.argv);