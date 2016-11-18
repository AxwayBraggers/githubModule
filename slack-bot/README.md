# Slackbot
### Slackbot that "listens" to Slack chat and intercepts commands. 
The bot is invoked when the command is in the following manner:
```export @slackusername githubusername(optional)```
The second parameter is optional (github username)

On interception, the bot collects slack user information (Name and email) and if the second parameter is passed
contacts github api and collects information for all public repositories of that github user.

## Usage:

##### `> LOGIN_TOKEN=xxx node . (for Windows users: set LOGIN_TOKEN=xxx)`

## In Slack chat:

#### `export @JohnDoe JohnDoeGit` or
#### `export @JohnDoe` or 
#### `get @JohnDoe JohnDoeGit`
