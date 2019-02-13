# qcl: quicli

Quick CLI installer + runner

## NEW

`qcl` is now a package manager built on TOP of other package managers. Rather than using its own binaries downloaded from our servers, it will simply keep track of all packages installed through package managers such as npm or yarn. It is a drop-in replacement for both of these (and uses them under the hood).

## TODO

- Finish TODOs
- Add Babel
- Clean up files
- Make set & --expiry consistent so that it's either "5hours" or "5 hours" but not both
- Make set & --expiry consistent with min/mins
- Add expiry runtime type checking for everything (set, --expiry, list, etc.), perhaps using moment.isValid?
