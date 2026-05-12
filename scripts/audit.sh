#!/bin/bash
set -e

if [ -f pnpm-lock.yaml ]; then
  pnpm audit --audit-level=high
elif [ -f yarn.lock ]; then
  yarn audit --level high
elif [ -f package-lock.json ]; then
  npm audit --audit-level=high
fi