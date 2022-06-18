# Poard - Pull request manager

Poard provides a user interface to manage pull requests.

Based on [Remix](https://remix.run/).

# Requirements

  * Node & npm

# Installation & setup

```shell
 $ npm install                        # Install all dependnencies
 $ cp config.example.ts config.ts     # Copy the config file and add a personal GitHub token (repo permissions suffice)
 $ npm run setup                      # Creates and migrates the database
 $ CREATE_ORGS=<INSERT GITHUB ORG> npm run github:scrape # Scrape the GitHub orgs and repos and fill the database
 $ npm run dev                        # Starts the remix dev server on port 3000
```
