# qcl: quicli

Quick CLI installer + runner

## NEW

`qcl` is now a package manager built on TOP of other package managers. Rather than using its own binaries downloaded from our servers, it will simply keep track of all packages installed through package managers such as npm or yarn. It is a drop-in replacement for both of these (and uses them under the hood).

## TODO

- Fix import issues (with babel?) (where you have to do `qcl.install.default` instead of just `qcl.install()`)
- Clean up files so that they don't share data between functions (just keep doing getData, little to no side effects)

## How to Dev

Now that qcl uses Babel, here's how to build and type-check.
When starting to code, run `npm run type-check:watch` to automatically typecheck on file change. Or simply use `npm run type-check` if you prefer to do it manually.
To build the code, run `npm run build`, this will compile everything into the `lib` directory.
