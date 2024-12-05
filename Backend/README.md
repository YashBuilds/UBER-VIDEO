# User Registration API Documentation

## Endpoint: `/users/register`

### Method: `POST`

### Description:
This endpoint allows a new user to register by providing their first name, last name, email, and password. The server validates the provided data, hashes the password, and stores the user in the database.

---

### Request Payload:

The payload should be sent as a JSON object in the request body with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}


### Example Response

- `user` (object):
 - `fullname` (string) : User's first name (minimum 3 characters).
  - `firstname` (string) : User's last name (minimum 3 characters).
  - `lastname` (string) : User's last name (minimum 3 characters).
 - `email` (string) : User's email address (must be a valid email).
 - `password` (string) : User's password (minimum 6 characters);
- `token` (string) : JWT Token  
