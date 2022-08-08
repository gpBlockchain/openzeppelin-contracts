#!/bin/bash
if echo "$1" | grep -Eq '^[0-9]+'; then
    try=$1
    shift && cmd="$@"
else
    try=3
    cmd="$@"
fi
for ((i=1; i<=${try};i++))
do
  $cmd
  ret=$?
  if [[ ${ret} == 0 ]];then
    exit ${ret}
  fi
done
exit ${ret}
