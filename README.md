# Website for internal work purposes of Intelvideo Studio

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
