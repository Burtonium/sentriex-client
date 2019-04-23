#!/bin/bash
npm run build && rsync -avz dist/ root@159.203.15.131:/var/www/html