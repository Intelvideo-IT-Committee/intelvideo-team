# Website for internal work purposes of Intelvideo Studio

### TO-DO list

1. Make login page work
2. Create **/public/** folder for static files
3. Make page for users to change info about them
4. Test *'socket.io'* package by displaying list of users who is online on the main page

*to be continued...*

### Colors

1. Base **#FFF9E9**
2. Dark-grey **#3D3D36**
3. Light-grey **#B7B7BC**
4. Yellow **#F8C62C**
5. White **#FFFFFF**

### Folders structure

**middleware/** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- all technical staff, e. g. server settings, global variables, DB connection

**route/** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- routing logic. These files takes the address of request and redirect it to the correct *view* function (check  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
here authentication and other input data correctness)  

**views/** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
these files handle requests and render response  

**templates/** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
all EJS templates for *view* render stored here  

_**package.json**_ &nbsp;&nbsp;&nbsp;-
server info, including dependencies  

_**index.js**_ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
start script for the server
