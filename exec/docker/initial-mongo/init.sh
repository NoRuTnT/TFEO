#!/bin/bash
set -e

mongo <<EOF
use admin
db.auth('root', 'tfeo123')
db.dropUser('tfeo');
db.createUser({
  user: 'tfeo',
  pwd: 'tfeo123',
  roles: ['root']
});
EOF


#mongoimport --username tfeo --password tfeo123 --authenticationDatabase admin --db test --collection home --type csv --file /data/merged_data.csv --headerline
