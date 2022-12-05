
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
 
geth --config ${DATA_DIR}/config.toml --datadir=${DATA_DIR} --genesis=${DATA_DIR}/genesis.json \
    --nodekeyhex=9011d1fa09b24619bf9509d36c10a086d35fecd3329a9815602d654da9a29993\
    --syncmode=full\