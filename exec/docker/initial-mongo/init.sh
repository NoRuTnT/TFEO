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