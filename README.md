# qcl: Quick Command Line [![npm version](https://img.shields.io/npm/v/qcl.svg)](https://www.npmjs.com/package/qcl) [![Github License](https://img.shields.io/github/license/pandawanfr/qcl.svg)](LICENSE)

`qcl` is an addon that works on top of other package managers like npm and yarn.

It keeps track of all globally installed packages and removes those that have passed their expiry date. This allows you to quickly install temporary packages (or CLIs) without having to worry about uninstalling them.

By default, packages are kept for 48 hours. (See [Configuration](#Configuration) to change this).

## Why

A lot of us have CLIs we installed years ago to interface with some obscure framework we were learning back in 2013. Today, CLIs take up a sizeable chunk of space and can sometimes cause keyword conflicts with other tools we use. To remedy this, you can use `qcl` to automatically uninstall that bulky package when you're done using it.

## Installation

To install the latest version of qcl, run this command:

```sh
npm install -g qcl
```

## Usage

Cleanup expired packages:

```sh
qcl
# or
qcl cleanup
```

Install a package:

```sh
qcl install express
# or with custom expiry time
qcl install express -e 3days
```

Uninstall a package:

```sh
qcl uninstall express
```

List installed packages (and their expiry date):

```sh
qcl list
```

Get more help:

```sh
qcl --help
# or for a specific command
qcl install --help
```

## Configuration

Currently, qcl supports the use of `npm` or `yarn` using the `package_manager` option. Default is `npm`. This can be changed using this command:

```sh
qcl set package_manager yarn
```

You can also change the default expiry duration using the `expiry` option. Default is `48hours`. This can be changed using this command:

```sh
qcl set expiry 30mins
```

## Contributing

1. Fork it (<https://github.com/PandawanFr/qcl/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
