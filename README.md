# NoSQL: Social Network API

## Link to Deployed Video Demonstration
- https://drive.google.com/file/d/1jPd7Q7vDX4-4RWwCfGy5dq8Albk4-9FS/view

For this project I built an API for a social network using Express.js for routing, a MongoDB database, and the Mongoose ODM. 

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Mock-Up

The following animations show examples of the application's API routes being tested in Insomnia.

The first animation shows GET routes to return all users and all thoughts being tested in Insomnia:

![Homework Demo 01](./Assets/18-nosql-homework-demo-01.gif)

The second animation shows GET routes to return a single user and a single thought being tested in Insomnia:

![Homework Demo 02](./Assets/18-nosql-homework-demo-02.gif)

The third animation shows the POST, PUT, and DELETE routes for users being tested in Insomnia:

![Homework Demo 03](./Assets/18-nosql-homework-demo-03.gif)

Your walkthrough video should also show the POST, PUT, and DELETE routes for thoughts being tested in Insomnia.

The final animation shows the POST and DELETE routes for a user’s friend list being tested in Insomnia:

![Homework Demo 04](./Assets/18-nosql-homework-demo-04.gif)

### Models

**User**

-  `username`

   -  String
   -  Unique
   -  Required
   -  Trimmed

-  `email`

   -  String
   -  Required
   -  Unique
   -  Must match a valid email address (look into Mongoose's matching validation)

-  `thoughts`

   -  Array of `_id` values referencing the `Thought` model

-  `friends`
   -  Array of `_id` values referencing the `User` model (self-reference)

**Schema Settings**

Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query

---

**Thought**

-  `thoughtText`

   -  String
   -  Required
   -  Must be between 1 and 280 characters

-  `createdAt`

   -  Date
   -  Set default value to the current timestamp
   -  Use a getter method to format the timestamp on query

-  `username` - Which user created this thought

   -  String
   -  Required

-  `reactions` (like replies)
   -  Array of nested documents created with the `reactionSchema`

**Schema Settings**

Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query

---

**Reaction** (SCHEMA ONLY)

-  `reactionId`

   -  Use Mongoose's ObjectId data type
   -  Default value is set to a new ObjectId

-  `reactionBody`

   -  String
   -  Required
   -  280 character maximum

-  `username`

   -  String
   -  Required

-  `createdAt`
   -  Date
   -  Set default value to the current timestamp
   -  Use a getter method to format the timestamp on query

**Schema Settings**

This will not be a model, but rather used as the `reaction` field's subdocument schema in the `Thought` model.

### API Routes

**`/api/users`**

-  `GET` all users

-  `GET` a single user by its `_id` and populated thought and friend data

-  `POST` a new user:

```json
// example data
{
   "username": "patrick",
   "email": "patrick@gmail.com"
}
```

-  `PUT` to update a user by its `_id`

-  `DELETE` to remove user by its `_id`

---

**`/api/users/:userId/friends/:friendId`**

-  `POST` to add a new friend to a user's friend list

-  `DELETE` to remove a friend from a user's friend list

---

**`/api/thoughts`**

-  `GET` to get all thoughts

-  `GET` to get a single thought by its `_id`

-  `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

```json
// example data
{
   "thoughtText": "Here's a cool thought...",
   "username": "lernantino",
   "userId": "5edff358a0fcb779aa7b118b"
}
```

-  `PUT` to update a thought by its `_id`

-  `DELETE` to remove a thought by its `_id`

---

**`/api/thoughts/:thoughtId/reactions`**

-  `POST` to create a reaction stored in a single thought's `reactions` array field

-  `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

## Reach out to me

- Patrick Ciongoli
- patrick.ciongoli@gmail.com

Thanks for viewing!

