# BIB_Project_Pet Adoption

- **.env file**

```
PORT = 8000
MONGODB = mongodb+srv://DevIdol:uxYDUUEv5ihgtFhz@cluster0.aegnn8x.mongodb.net/pet_adoption

SALT = 12

BASE_URL = http://localhost:8000
MAIL_CENTER = petadoption.mm@gmail.com
MAIL_PASS = ozoiaelkkidcysom
MAIL_CHANGE = petadoption.center.mm@gmail.com
MAIL_CHANGEPASS = rcprtbirooosuvsg
MAIL_CONTACT = contact.petadoption.mm@gmail.com
MAIL_CONTACTPASS = wbygspbxioekijeh
HOST = smtp.gmail.com
MAIL_PORT = 587
SECURE = true
SERVICE = gmail

SECRET_KEY = 45a087d6af0921796ed3b5c0f827a1e75e3300b8ad9fe6f35dd03bce35585e6b
```

- **URL Authentication**

```
localhost:8000/api/auth/register

localhost:8000/api/auth/login

localhost:8000/api/auth/logout
```

- **URL Email Verification**

```
localhost:8000/api/users/userId/verify/token
```
- **URL User**

```
localhost:8000/api/users/userId
```

- **URL Forgot Password**

```
localhost:8000/api/forgot-password

localhost:8000/api/forgot-password/userId/tokenId
```

- **URL Pet**

```
localhost:8000/api/pets

localhost:8000/api/pets/petId
```

- **URL Favorite**

```
localhost:8000/api/favorites/userId/petId

localhost:8000/api/favorites/userId
```

- **URL Adoption**

```
localhost:8000/api/adoptions

localhost:8000/api/adoptions/userId/petId

localhost:8000/api/adoptions/userId
```

- **URL Article**

```
localhost:8000/api/articles
```

- **URL Donation**

```
localhost:8000/api/donations
```


- **Method**

`GET`
`POST`
`PUT`
`DELETE`

- **Installation**

```
git clone git@github.com:DevIdol/pet_adoption
cd pet_adoption
yarn
yarn dev

open localhost:8000 in the browser
```