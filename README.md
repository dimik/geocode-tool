NodeJS Geocode Tool
============

Geocode Tool allows to geocode an address list using a simple web interface.

Description
============

Building WebMap application you often face a task of address-to-coordinates convertion for every object in your DataBase.
Depending on a number of objects this task can be solved manually or by creating complex client-server system with caching and requests multiplication.

We've decided to provide this online application as a ready-made solution for small business with a few number of objects
as well as an example of efficient and smart application for projects with a large amount of data.

Installation
------------
For using this tool locally you have to install <a href="https://nodejs.org/">NodeJS</a> with NPM and any kind of WebServer e.g. Nginx.
Clone this repo to your Work folder and run ```cd geocode-tool && npm install```.
Start server with ``` node server.js``` command.

You can use this nginx config example to setup your own server.
```
server {
  listen 80;

  # use your /etc/hosts file to map geocodetool.loc address to localhost
  # web-interface will work on http://geocodetool.loc/tools/geocode/
  server_name .geocodetool.loc;

  access_log /var/log/geocode-tool.access.log;
  error_log /var/log/geocode-tool.error.log;

  # url path of tool to use in browser
  # change %username% to your system login
  location /tools/geocode/ {
    alias /Users/%username%/Work/geocode-tool/public/;
  }
  # proxy requests to localhost on port 8887
  location /geocode-tool/ {
    proxy_pass http://localhost:8887/;
  }
}
```
