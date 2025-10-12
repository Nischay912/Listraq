// step97: lets import the neccesary packages for schema creation here below.
import { defineSchema, defineTable } from "convex/server";

// step98: now lets import validator from the convex values package here below ; It helps ensure data types are correct when inserting or updating records ; Convex will throw an error if wrong data type is passed.
import { v } from "convex/values";

export default defineSchema({
    // step99: now lets pass all the tables that we will have in this object here below ; here we will have only one table "todos" , so lets pass it here below.
    todos: defineTable({
        // step100: lets put all the fields needed in this table here below.

        // step101: we use "v" to create validators here below which tells that the type of "text" must be a string and "isCompleted" must be a boolean here below.
        text: v.string(),
        isCompleted: v.boolean(),
    }),
    // step102: similarly if needed we can create many tables schemas here below too.

    // step103: now when we visit the dashboard of convex > "data" in sidebar > "schema" there if you click > you will see the same code of here there too.

    // step104: so in one terminal we will be running the app "npx expo" and in other run this backend using "npx convex dev" here below.

    // step105: see the next steps in step106.txt file now there.

})