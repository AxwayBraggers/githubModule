# Github module
### A broker between Axway Braggers main app and github.com API

TOC

#### 1. [Introduction](#head1)
#### 2. [Goals](#head2)
#### 3. [Module initialization & methods](#head3)
#### 4. [Workflow](#head4)
#### 4. [Beta acceptance criteria](#head5)

### <a name="head1"></a> 1. INTRODUCTION

The Braggers Github module, tends to provide a method of contacting the github API, alongside with the slack Interface and gather use information.

### <a name="head2"></a>  2. GOALS

Github Module can gather information about a user from github API. The username is obtained trough a command issued in Slack. A Slack bot intercepts the command and invokes the module.
On completion, gathered information is sent to the main App, which persists the information to ArrowDB.
 
![User data Aggregation](https://github.com/AxwayBraggers/githubModule/Resources/User%20data%20aggregation.png)

This module is also capable of handling user authentication, and can act as an Identity Provider (iDP).
The module performs a basic form of authentication - user passes in their "**username**" either Slack or Github, and the module checks ArrowDB if the user exists.

![Login and Authentication](https://github.com/AxwayBraggers/githubModule/Resources/Login%20and%20Authentication%20Procedure.png)

> NOTE:
> User **doesn't** exist - the export command should be issued in slack


### <a name="head3"></a>  3. MODULE INITIALIZATION & METHODS

#### 3.1. Initiating the module 

**TBD**

#### 3.2. Available Methods 

```getGuthubUserById(user_id : number)```

*	Implementation (how to call - **TBD**)
*	expected parameters - **TBD**
*	return **TBD**

``` authenticateUser(user_name : string)```

*	Implementation (how to call - **TBD**)
*	expected parameters - **TBD**
*	return **TBD**

```persistUserInformation()``` - **TBD**
The method should ping the server (Arrow) with the newly fetched data. The server is responsible for data persistence. 


### <a name="head4"></a>  4. WORKFLOW

All issues and improvement requests should be added to the project's issue tracking system.
Members can (create and ) assign issues to themselves and work on them. 


### <a name="head5"></a>  5. BETA ACCEPTANCE CRITERIA

The following criteria should be met for the project to be tagged as a beta release:

* Can respond to **slack bot** notification
* Can contact github API
* Can get information from Github
* Can prompt server (*main app*) to persist information
* Networking communication should be **tested**
* Connection to the main app (persisting users) **should be tested**