Client <--------------- HTTP --------------> Server

Representational State Transfer
: CRUD Operations

- Create
- Read
- Update
- Delete

VIDLY

- http(s)://vidly.come/api/customers

HTTP Methods(Verbs)

- GET
- POST (CREATE)
- PUT (UPDATE)
- DELETE

Request
GET /api/customers

Response
[
{id: 1, name: ''},
{id: 2, name: ''}
]

Request
GET /api/customers/1 -- A single customer

Response
{id: 1, name: ' '}

UPDATE A CUSTOMER
Request
PUT /api/customers/1

{name: ''}

Response
{id: 1, name: ''}

DELETE A CUSTOMER
Request
DELETE /api/customers/1

CREATE A CUSTOMER
POST /api/customers

{name: 'su'}

Response
...
