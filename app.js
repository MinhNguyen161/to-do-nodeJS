const yargs = require("yargs");
const controller = require("./controller");
const c = require("./index")

//====================================================
// LOAD DATA
//
//====================================================
yargs.command({
    command: "list-all",
    describe: "show the todo list",
    handler: function () {
        const data = controller.loadData();
        let id = 1;

        data.map((obj) => {
            if (obj.status) {
                c.green(id + " task: " + obj.todo + " ----- status:" + obj.status)
                id++;
                return
            } else {
                c.red(id + " task: " + obj.todo + " ----- status:" + obj.status)
                id++;
                return
            }

        })
        // console.log(data)
    }
});
//====================================================
// LOAD DATA
// ONLY DONE THOU
//====================================================
yargs.command({
    command: "list-done",
    describe: "show the done todo list",
    handler: function () {
        const data = controller.loadData();
        let filtered = data.filter((obj) => obj.status === true)
        if (filtered.length === 0) {
            console.log("Nothing is done aha")
            return
        }
        console.log(filtered);
    }
});

//====================================================
// LOAD DATA
// ONLY NOT DONE THOU
//====================================================
yargs.command({
    command: "list-notdone",
    describe: "show the done todo list",
    handler: function () {
        const data = controller.loadData();
        let filtered = data.filter((obj) => obj.status === false)
        if (filtered.length === 0) {
            console.log("You finish everything!")
            return
        }
        console.log(filtered);
    }
});
//====================================================
// ADD DATA
//
//====================================================

yargs.command({
    command: "create",
    describe: "create a new todo",
    builder: {
        todo: {
            type: "String",
            demandOption: true,
            describe: "You forget to do add a todo"
        },
        status: {
            type: "boolean",
            demandOption: true,
            describe: "complete or not",
            default: false
        }
    },
    handler: function (arg) {
        console.log("what we have in arg", arg);
        controller.createTodo(arg.todo, arg.status);
    }
});
//====================================================
// DELETE DATA
//
//====================================================
yargs.command({
    command: "delete",
    describe: "delete a todo",
    builder: {
        delete: {
            type: "String",
            demandOption: true,
            describe: "delete by search"
        }
    },
    handler: function (arg) {
        controller.deleteTodo(arg.delete)

    }
});
//====================================================
// DELETE DATA BY ID
//
//====================================================
yargs.command({
    command: "delete-id",
    describe: "delete a todo",
    builder: {
        id: {
            type: "interger",
            demandOption: true,
            describe: "delete by id"
        }
    },
    handler: function (arg) {
        controller.deletebyID(arg.id)

    }
});

//====================================================
// DELETE ALL DATA
//
//====================================================
yargs.command({
    command: "delete-all",
    describe: "delete all everything",
    handler: function () {
        controller.deleteAll()
    }
});
//====================================================
// DELETE ALL DONE
//
//====================================================
yargs.command({
    command: "delete-done",
    describe: "delete all done",
    handler: function () {
        controller.deleteDone()
    }
});
//====================================================
// TOGGLE DONE OR NOT DONE 
//
//====================================================
yargs.command({
    command: "toggle",
    describe: "make sth done or not done",
    builder: {
        toggle: {
            type: "String",
            demandOption: true,
            describe: "toggle by search"
        }
    },
    handler: function (arg) {
        controller.toggle(arg.toggle)

    }
});



//====================================================
// CALL THE YARGS FUNCTION
//
//====================================================
yargs.parse();
