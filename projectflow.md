# REAL-TIME CHAT APP - MASTER FLOW MAP

## PHASE 1 — DATABASE

Problem:
Where do we store users and messages?

Solution:
MongoDB Atlas

Flow:

Server
↓
MongoDB Atlas
↓
Store Data

Outcome:

✅ Database Connected

---

## PHASE 2 — USER REGISTRATION

Problem:
How do users create accounts?

Flow:

Register Request
↓
Route
↓
Controller
↓
bcrypt.hash()
↓
MongoDB

Outcome:

✅ User Stored
✅ Password Hashed

Mental Model:

User
↓
Secure Password
↓
Database

---

## PHASE 3 — LOGIN

Problem:
How do we verify users?

Flow:

Email + Password
↓
Find User
↓
bcrypt.compare()
↓
Generate JWT
↓
Return Token

Outcome:

✅ User Verified
✅ JWT Generated

Mental Model:

Login
↓
Identity Verified
↓
Digital ID Card Created

---

## PHASE 4 — JWT

Problem:
How does server remember user?

Flow:

Login
↓
JWT Created
↓
Frontend Stores Token
↓
Future Requests Send Token

Mental Model:

JWT = Digital ID Card

Outcome:

✅ User Identity Available

---

## PHASE 5 — AUTH MIDDLEWARE

Problem:
Anyone can access APIs

Without Middleware:

Request
↓
Controller
↓
Database

Anyone gets data

---

With Middleware:

Request
↓
Middleware
↓
Verify JWT
↓
Controller
↓
Database

Only logged-in users proceed

Mental Model:

JWT = ID Card

Middleware = Security Guard

Controller = Building

Outcome:

✅ Protected Routes

---

## PHASE 6 — req.user

Problem:
Controller needs current user

Flow:

JWT
↓
Middleware
↓
Find User
↓
req.user = user
↓
Controller

Mental Model:

Middleware identifies user

Controller uses user

Outcome:

✅ Current User Available Everywhere

---

## PHASE 7 — USERS API

Problem:
Who can I chat with?

Flow:

GET /users
↓
Middleware
↓
req.user._id
↓
Get All Users
↓
Exclude Current User
↓
Return Users

Mental Model:

Current User
↓
Everyone Else
↓
Chat List

Outcome:

✅ Users Sidebar Ready

---

## PHASE 8 — MESSAGE MODEL

Problem:
Where do chats live?

Flow:

Message
├── sender
├── receiver
├── text
└── timestamps

Mental Model:

# One Message

One Document

Outcome:

✅ Chat Storage Ready

---

## PHASE 9 — SEND MESSAGE API

Problem:
How do we send messages?

Flow:

POST /messages
↓
Middleware
↓
req.user._id
↓
receiverId
↓
text
↓
Message.create()
↓
MongoDB

Mental Model:

Sender
↓
JWT

Receiver
↓
Body

Outcome:

✅ Messages Saved

---

## PHASE 10 — CHAT HISTORY API

Problem:
How do we load previous chats?

Flow:

GET /messages/:userId
↓
req.user._id
↓
req.params.userId
↓
Find Messages
↓
A → B
OR
B → A
↓
Sort by createdAt
↓
Return Conversation

Mental Model:

Me
↔
Other User
↓
Entire Conversation

Outcome:

✅ Chat History Working

---

## REST BACKEND COMPLETE

Authentication
✅

Authorization
✅

Users API
✅

Send Message API
✅

Chat History API
✅

---

## CURRENT SYSTEM

User Logs In
↓
JWT
↓
Middleware
↓
req.user
↓
Users API
↓
Send Message API
↓
Chat History API
↓
MongoDB

Everything Working

---

## NEXT PHASE — SOCKET.IO

Current:

Send Message
↓
Stored in Database
↓
Refresh Page
↓
See Message

Problem:

Not Real-Time

---

Socket.IO:

Send Message
↓
Server
↓
Instant Delivery
↓
Receiver Gets Message

No Refresh Needed

Outcome:

Real-Time Chat Application
