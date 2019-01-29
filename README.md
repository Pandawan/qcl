# qcl: quicli
Quick CLI installer + runner

# Server
Node.js server indexes npm packages and compiles using pkg. When receiving request for npm package, serves the raw binary compiled for the platform.

# Client
When user runs "qcl [package]", sends GET request to server for binary and pushes to /usr/bin/local or correct directory. config.json defines configuration but deletes binaries after 48 hours by default.
