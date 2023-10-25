#!/bin/bash

set -eux

cd ~/funnde
php artisan migrate --force
php artisan config:cache