#!/usr/bin/env bash

# source ./scripts/util.sh

echo PQD

workspace=$(cd `dirname $0`; pwd)/../..
DATA_DIR=${workspace}/storage/fxce-rpc

account_cnt=$(ls ${DATA_DIR}/keystore | wc -l)
i=1
unlock_sequences="0"
while [ "$i" -lt ${account_cnt} ]; do
    unlock_sequences="${unlock_sequences},${i}"
    i=$(( i + 1 ))
done 

echo ${DATA_DIR}
 
geth --datadir=${DATA_DIR} --genesis=${DATA_DIR}/genesis.json console --http.port 2003\
    --gcmode=archive\
    --syncmode=full\
    --http\
    --http.addr=192.167.98.4\
    --http.corsdomain=*\
    --http.vhosts=*\
    --ethstats fxce-rpc:pqd@192.167.98.4:3000\
    --http.api=web3,eth,debug,personal,net,txpool\