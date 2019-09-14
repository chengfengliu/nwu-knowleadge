#!/bin/bash
PID=`lsof -t -i:80`
PID2=`lsof -t -i:443`
git pull
kill -9 $PID
kill -9 $PID2
echo "killed http:80 $PID and killed https:443 $PID2"
nohup npm run build &
echo "started"