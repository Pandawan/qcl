# qcl Client

## Todo

- [x] Reorganize everything into separate files for each subcommand/section
- [x] Make "list" subcommand show a formatted table (without borders like "ls -l")
- [x] When separating into multiple files, also separate "getDataPath" into separate functions.
- [x] Rename interfaces to better names
- [ ] Add parameters to the "list" subcommand to display more info like version
- [ ] Add a "silent" in the settings (and as an --option) to disable console.logs when running. (Rename "debug" to silent in the functions)
- [ ] Add "versions" to IQCLPackage so that calling "install" can update rather than error if it already exists.
- [ ] Add /qcl/pkg to PATH
- [ ] Allow for multiple packages in "install" and "uninstall" subcommands
- [ ] Add "set" subcommand for settings (private_key, preservation_time, debug_mode).
- [ ] Actually download binaries in "install"
- [ ] Better error handling everywhere
