const fs = require("fs"); // importing file system

//====================================================
// LOAD DATA
//====================================================
const loadData = () => {
    try {
        // read the file data.json in root directory and assign it to dataBuffer
        // dataBuffer will contain binary data reading from the file
        const dataBuffer = fs.readFileSync("data.json");
        // convert binary data to string (json object)
        const dataJSON = dataBuffer.toString();
        // parsing a json object to js object so we can work with
        return JSON.parse(dataJSON);
    } catch (e) {
        // Handle error, if something goes wrong, let's just return an empty array.
        console.error(e);
        return [];
    }
};
//====================================================
// LOAD COMPLETED DATA ( over command)
//====================================================
//====================================================
// LOAD INCOMPLETE DATA ( over command)
//====================================================
//====================================================
// ADD DATA
//====================================================


const createTodo = (e = "Study code", status) => {
    const todoList = loadData();
    console.log(todoList)
    todoList.push({ todo: e, status: status });
    const todoJSON = JSON.stringify(todoList); // make to string
    fs.writeFileSync("data.json", todoJSON); // add the data with the func
};
//====================================================
// TOGGLE DONE OR NOT
//====================================================
const toggle = (todo) => {
    let todoList = loadData();
    let index = todoList.findIndex((obj) => obj.todo === todo)
    if (index === -1) {
        console.log("wrong input there's nothing to toggle")
        return
    }
    todoList[index].status = !todoList[index].status
    const todoJSON = JSON.stringify(todoList); // make to string
    fs.writeFileSync("data.json", todoJSON); // add the data with the func
}
//====================================================
// DELETE DATA BY ID
//====================================================
const deletebyID = (index) => {
    const todoList = loadData();
    todoList.splice(index - 1, 1) // splice the thing that u want to remove
    const todoJSON = JSON.stringify(todoList); // make to string
    fs.writeFileSync("data.json", todoJSON); // add the data with the func
}

//====================================================
// DELETE DATA BY SEARCH
//====================================================
const deleteTodo = (todo) => {
    const todoList = loadData();
    let index = todoList.findIndex((obj) => obj.todo === todo)
    if (index === -1) {
        console.log("wrong input there's nothing to delete")
        return
    }
    todoList.splice(index, 1) // splice the thing that u want to remove
    const todoJSON = JSON.stringify(todoList); // make to string
    fs.writeFileSync("data.json", todoJSON); // add the data with the func
}
//====================================================
// DELETE ALL DONE DATA
//====================================================
const deleteDone = (todo) => {
    const data = loadData();
    let filtered = data.filter((obj) => obj.status === false)
    const todoJSON = JSON.stringify(filtered); // make to string
    fs.writeFileSync("data.json", todoJSON); // add the data with the func
}
//====================================================
// DELETE ALL TODO LIST
//====================================================

const deleteAll = () => {
    const newTodo = [];
    fs.writeFileSync("data.json", newTodo)
}
//====================================================
// EXPORTING
//====================================================


module.exports = {
    loadData: loadData,
    createTodo: createTodo,
    deleteTodo: deleteTodo,
    deleteAll: deleteAll,
    deleteDone: deleteDone,
    deletebyID: deletebyID,
    toggle: toggle
};
