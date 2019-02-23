# qcl: Quick Command Line

`qcl` is an addon that works on top of other package managers like npm and yarn.

It keeps track of all globally installed packages and removes those that have passed their expiry date. This allows you to quickly install temporary packages (or CLIs) without having to worry about uninstalling them.

## Why 
A lot of us have CLIs we installed years ago to interface with some obscure framework we were learning back in 2013. Now that CLI takes up a sizeable chunk of space and can sometimes cause keyword conflicts with other tools we use. That's why you'd use `qcl` to uninstall that bulky package when you're done using it.

## TODO

- Make better README with helpful commands
- Make qcl work with local
