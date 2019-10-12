const keys = require('./keys');
const redis = require('redis');

const redisClient= redis.createClient({
    host : keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});
console.log('redisPort',keys.redisPort);
const sub = redisClient.duplicate();

function fib(index){
    if (index < 2) return 1;
    return (fib(index -1 )+ fib(index - 2));
}
sub.on('message',(channel, message)=>{
    const value = fib(parseInt(message));
    redisClient.hset('values', message, value);
});
sub.subscribe('insert');