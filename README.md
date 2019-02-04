# qcl: quicli

Quick CLI installer + runner

## Server

Node.js server indexes npm packages and compiles using pkg. When receiving request for npm package, serves the raw binary compiled for the platform.

## Client

When user runs "qcl [package]", sends GET request to server for binary and pushes to /usr/bin/local or correct directory. config.json defines configuration but deletes binaries after 48 hours by default.

## Monetization Plan

Client is open source and can be downloaded/run for free. When used free, it uses source code from npm rather than binaries, resulting in slightly slower download times but still has shortterm/cleanup functionality. When the user begins paying, they get a key included in the config.json that allows them to get binaries and some other functionality from backend.
