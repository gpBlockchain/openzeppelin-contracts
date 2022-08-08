#!/bin/bash
if echo "$1" | grep -Eq '^[0-9]+'; then
    try=$1
    shift && cmd="$@"
else
    try=3
    cmd="$@"
fi
i=0; 
while [ "$i" -lt "${try}" ]; do
  $cmd
  ret=$?
  if [ ${ret} == 0 ];then
    exit ${ret}
  fi
  i=$((i + 1))
done
exit ${ret}
