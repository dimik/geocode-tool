NodeJS Geocode Tool
============

Geocode Tool provides an ability to geocode addresses list using simple web interface and without any programming skills.

Description
============

Building WebMap application you could often faced with task of address-to-coordinates (longitude-lattitude) convertion for every object in your DataBase.
Depending on number of objects solution requires different approaches from simple "by hand" to building complicated client-server systems with caching and requests multiplication.

We've decided to provide this online application as a ready-made solution for small businesses with very few number of objects
and as an example of effective productive and smart application for projects with large amount of data.

Installation
------------
For using this tool locally you have to install <a href="https://nodejs.org/">NodeJS</a> with NPM and any kind of WebServer e.g. Nginx
Clone this repo to your Work folder and run ```cd geocode-tool && npm install```
Start server with ``` node server.js``` command.

You could use this nginx config example to setup you server.
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
