# qcl: quicli

Quick CLI installer + runner

## NEW

`qcl` is now a package manager built on TOP of other package managers. Rather than using its own binaries downloaded from our servers, it will simply keep track of all packages installed through package managers such as npm or yarn. It is a drop-in replacement for both of these (and uses them under the hood).

## TODO

- Add Babel
- Clean up files
- Clean up files so that they don't share data between functions (just keep doing getData, little to no side effects)
