// step108: this "query" comes from this path in the "convex" folder that was created ; so we import from it here below.
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

// step107: now lets create a function to send a GET request to the backend ; and GET is called using "query" by rule in convex.
export const getTodos = query({

    // step109: now whenever we call "getTodos" query, it will run the following function there.

    // step110: it takes "ctx" which is a context , using which we can interact with the database there.
    handler: async (ctx) => {

        // step111: so we select all the rows from the "todos" table and order them in descending order i.e the latest todo will be on top and the oldest todo will be at the bottom.

        // step112: Without .collect(), you only have a query cursor, not actual results ; In databases (including Convex), a cursor is like a pointer to the results of a query, not the actual data yet ; so "collect()" will convert the query inot a real array of todos objects there.
        const todos = await ctx.db.query("todos").order("desc").collect()

        // step113: now the retunr below : Sends the array back to the frontend that called this query.
        return todos;

        // step114: on convex dashboard website , we can see this code there in sidebar > functions > code : so since in the 2nd terminal : "npx convex dev" is running , we can see the real time changes there too.
    }
});

// step115: now like discussed earlier , for POST request like "create" , "update" and "delete" we will use "mutation" ; and POST is called using "mutation" by rule in convex.

// step116: so lets create a function first to add a todo here below.
export const addTodo = mutation({

    // step117 now when user adds a todo , he will send some text there ; so lets take it in the args here below.

    // step118: so "args" defines the arguments that the mutation or query expects from the frontend ; and we use "v" again to verify the type like if : frontend passes : {text: "go on walk"} > its valid , but if frontend passes : {text: 123} > its not valid.
    args: { text: v.string() },

    // step119: now like done earlier too there : Every Convex query/mutation needs a handler function ; so inside this function , we write what will happen when the query/mutation is called.

    // step120: lets grab the args as the parameter here below.
    handler: async (ctx, args) => {

        // step121: it returns the id of the todo that was just created.

        // step122: so we insert in the "todos" table , the object {} passed here below.
        const todoId  = await ctx.db.insert("todos", {

            // step123: like seen earlier , "args" was the object that was sent by the frontend ; so we use it here below.
            text: args.text,
            isCompleted: false // new todos are not completed by default initially
        })

        // step124: now we return the id of the todo that was just created.
        return todoId
    }
})

// step125: now lets create a function to toggle the completion of a todo here below.
export const toggleTodo = mutation({

    // step126: again now we use "v" to verify if its type is : a valid ID of a row in the todos table; and if its so , we take that todo id as argumnet here.
    args:{id: v.id("todos")},
    handler: async (ctx, args) => {

        // step127: we fetch the todo using its id here below.
        const todo = await ctx.db.get(args.id)

        // step128: now : we use ConvexError which is a built in error in convex to throw an error if todo is not found.
        if(!todo){
            throw new ConvexError("Todo not found")
        }

        // step129: else, we update the todo of the id equal to "args.id" here below using the "patch" method and make the true to false and vice versa here below.
        await ctx.db.patch(args.id, {
            isCompleted: !todo.isCompleted
        })
    }
})

// step130: now lets write a function to delete a todo here below.
export const deleteTodo = mutation({
    args:{id: v.id("todos")},
    handler: async (ctx, args) => {
        // step131: now we use the "delete" method to delete the todo of the id equal to "args.id" here below.
        await ctx.db.delete(args.id)
    }
})

// step132: now lets write a function to update the todo here below.
export const updateTodo = mutation({

    // step133: now we will get the id of todo to be updated as well the new text entered by the user in it here below as arguments.
    args:{id: v.id("todos"), text: v.string()},
    handler: async (ctx, args) => {
        // step134: now we use the "patch" method to update the todo's text with the new text written and passed as argument in the todo of the id equal to "args.id" here below.
        await ctx.db.patch(args.id, {
            text: args.text
        })
    }
})

// step135: now lets write a function to clear all the todos here below.
export const clearAllTodos = mutation({
    handler: async (ctx) => {
        // step137: lets fetch all the todos first here below.
        const todos = await ctx.db.query("todos").collect()
        
        // step138: then lets run a loop through the array to delete each todo here below.
        for(const todo of todos){
            await ctx.db.delete(todo._id) // delete using the _id of the todo in the database of convex there as whenever a todo is ther ein convex , convex provides the _id of the todo there, and we use it here to delete the todo using that _id thus here below.
        }

        // step139: as a response , we can return the number of todos that were deleted here below.
        return {deletedCount: todos.length}

        // step140: and since we are running "npx convex dev" all these functions will be updated and present in the convex dashboard > functions from sidebar > code : there too.

        // step141: see the next steps in step142.txt file now there.
    }
})