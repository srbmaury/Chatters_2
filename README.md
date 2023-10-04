# Chatters

A social meida site using django with email authenticated login system where users can 
- Create account 
- Reset their password
- Create any new post 
- Delete their previous posts 
- Change their password 
- Update their profile picture and bio 
- Check each other's profile 
- Follow other users 
- Like and save posts 
- Send message to other users
- Report any problems 
- Get important notifications 
- See count of posts/followers/following 

Default profile picture for each user is provided by [Multiavatar API](https://api.multiavatar.com/).

<details>
<summary>Photos</summary>
  
![Screenshot 2023-10-04 085033](https://github.com/srbmaury/Chatters_2/assets/85755081/d4203045-74a3-4d5b-bfce-845885f6a526)

![Screenshot 2023-10-04 085042](https://github.com/srbmaury/Chatters_2/assets/85755081/3bc0c5e0-3db8-43da-858c-f98643a62710)

![Screenshot 2023-10-04 084753](https://github.com/srbmaury/Chatters_2/assets/85755081/3c8f87f6-12a6-4ca5-83f4-15712ba7517f)

![Screenshot 2023-10-04 084823](https://github.com/srbmaury/Chatters_2/assets/85755081/f766bc7e-f427-42da-878b-e9cc65c25610)

![Screenshot 2023-10-04 084834](https://github.com/srbmaury/Chatters_2/assets/85755081/c9393d4c-bd9c-4a97-957d-3127a1478e7d)

![Screenshot 2023-10-04 084844](https://github.com/srbmaury/Chatters_2/assets/85755081/5a5b7306-0be9-421a-9f77-a1058c3cae78)

![Screenshot 2023-10-04 084922](https://github.com/srbmaury/Chatters_2/assets/85755081/32223763-9b4b-4921-855b-9743c2001c86)

</details>

## Setup

Clone the repository:

```sh
$ git clone git@github.com:srbmaury/Chatters_2.git
```


## Installing packages using pip and virtual environments

### Installing pip
pip is the reference Python package manager. It’s used to install and update packages. You’ll need to make sure you have the latest version of pip installed.

```sh
py -m pip install --upgrade pip
py -m pip --version
```
### Installing virtualenv
virtualenv is used to manage Python packages for different projects. Using virtualenv allows you to avoid installing Python packages globally which could break system tools or other projects. You can install virtualenv using pip.

```sh
py -m pip install --user virtualenv
```
### Creating a virtual environment
To create a virtual environment, go to your project’s directory and run venv. If you are using Python 2, you are strongly recommended to use Python 3

```sh
py -m venv env
```

### Activating a virtual environment
```sh
.\env\Scripts\activate
```

Then install the dependencies:

```sh
(env)$ pip install -r requirements.txt
```
Note the `(env)` in front of the prompt. This indicates that this terminal
session operates in a virtual environment set up by `virtualenv2`.

Once `pip` has finished downloading the dependencies move to project directory:
```sh
(env)$ cd Chatters_2
```

Generate a SECRET_KEY using following command
```
python manage.py shell -c 'from django.core.management import utils; print(utils.get_random_secret_key())'
```

Apply migrations to the database with command below :
```
(env)$ python manage.py migrate
```

### Creating a superuser
To create a superuser:
```sh
(env)$ python manage.py createsuperuser
```

### Runnig the server
```sh
(env)$ python manage.py runserver
```

And navigate to `http://127.0.0.1:8000/`.
