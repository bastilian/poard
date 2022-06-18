import { execSync } from 'node:child_process';

const todos = execSync("git grep -n -e TODO -e FIXME").toString();

console.log(todos.split('\n').map((todoLine) => {
  return todoLine.split(':').map((part) =>
    part.replace('//', '').replace('{/*', '').replace('*/}', '').trim()
  ).join(': ');
}).join('\n'));
