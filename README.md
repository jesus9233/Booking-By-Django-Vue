# Tables booking
Simple application for booking of tables
### Installation

Install the requirements

```sh
$ python manage.py install -r requrements.txt
```

Set up database and perform all migrations

```sh
$ python manage.py makemigrations tables
$ python manage.py migrate
```
Optionaly you can create tables schema

```sh
$ python manage.py create_tables
```

Install the frontend dependencies
```sh
$ cd frontend
$ npm install
```
> Do not forget to create "frontend/utils/sendMessage.js" module for sending email. 
> You can find an example in "frontend/utils/sendMessage.example.js". 
> EmailJs service is using by default (https://www.emailjs.com/)
