# Poard - Pull request manager

Poard provides a user interface to manage pull requests.

![poard](https://user-images.githubusercontent.com/7757/178163624-af3b0e2c-9008-4318-b911-c14e45ac8938.gif)

Built on [Remix](https://remix.run/), [Prisma](https://www.prisma.io), [React](https://reactjs.org/) and [Patternfly](https://www.patternfly.org).

# Requirements

  * Node v16+ & npm

# Installation & setup

```shell
 $ npm install                        # Install all dependnencies
 $ cp config.example.ts config.ts     # Copy the config file and add a personal GitHub token (repo permissions suffice)
 $ npm run setup                      # Creates and migrates the database
 $ CREATE_ORGS=<INSERT GITHUB ORG> npm run github:scrape # Scrape the GitHub orgs and repos and fill the database
 $ npm run dev                        # Starts the remix dev server on port 3000
```

# Contributing

Contributions are welcome! There are numerous `TODO` comments all over the repository, feel free to open a pull request addressing them.
If you find a bug, fix it. And if you work on something, feel free to add more `TODO` comments for things that are out of reach or need further work. (fair use)

## General TODOs

This is a list of TODOs the aren't specific to any specific part, but the overall codebase.

* [ ] Add proper stylesheets (possibly styled-components or similar) and cleanout inline styles
* [ ] Cleanup and make type definitions proper
* [ ] Setup cypress testing and add tests (if possible use vitest)

# License (MIT)

Copyright © 2022 Sebastian Gräßl

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
