
# Blogging application - ECE Webtech project

This is a blogging website. It is a video games website to be more precise 

## Production 

- Vercel URL: https://ece-webtech-project-roan.vercel.app/
- Supabase project URL: https://app.supabase.com/project/jprezuvuwgxqhyajekck

## Usage

*how to start and use the application, run the tests, ...*

* Clone this repository, from your local machine:
  ```
  git clone ...
  cd ...
  ```
* Start the the application
  ```bash
  cd app
  # Install dependencies (use yarn or npm)
  npm install
  npm run build
  npm start
  ```
* Start Supabase
  ```bash
  cd supabase
  docker compose up ...
  ```

## Authors

 - Dimitriu Nicolas , nicolas.dimitriu@edu.ece.fr
 - Dubard Maxime , maxime.dubard@edu.ece.fr
 - Moissinac-Massenat Xavier , xavier.moissinacmassenat@edu.ece.fr

## Tasks
  
**Project management:**

* Naming convention   
  *every page is name correctly with it function and each part are in different folders*
* Project structure   
  */pages for pages , /components for header etc..c and /public for the images and css *
* Git   
  * every commit respect the correct commit method *
* Code quality   
  *overall the quality of the code is good , it need more error handling*
* Design, UX, and content   
  * pagging , images , colors , spacing for each pages to be nice *

**Application development:**

* Home page   
  * give the theme of our blog and also allow to navigate throw the different pages 2/2*
* Login and profile page   
  *you can login with an email but also with github with a signin and signup button. Login and logout are also in the header 4/2*
* New articles creation   
  *you can create article and they are persist in the databse and only the users that are login can create an article. 6/6*
* New comment creation   
  *you can create a comment for the corresponding article and it is persist in the database 4/4*
* Resource access control   
  *RLS is activate for all the tables . you have one select,update,delete,insert6/6*
* Article modification   
  *you can modify your article and it persist in the database but any users can do it 3/4*
* Article removal   
  *you can remove your article but any users can do it 1/2*
* Comment modification   
  *you can modify your comment but any users can do it 1/2*
* Comment removal   
  *you can delte your comment but any users can do it*
* Account settings   
  *not done 0/4*
* WYSIWYG integration   
  *not done 0/2*
* Gravatar integration   
  *not done 0/2*
* Light/dark theme   
  *not done 0/2*
* Accent color selection   
  *not done 0/4*

## Bonus

* Task title   
  *not done*
