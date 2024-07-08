

process.on('unhandledRejection', error => {
    console.log(error)
})
process.on('uncaughtException', error => {
    console.log(error)
})
process.on('warning', warning => {
    console.log(warning);
});
process.on('rejectionHandled', promise => {
    console.log(`Rejection handled: ${promise}`);
});
process.on('beforeExit', code => {
    console.log(`Before exit with code: ${code}`);
});
process.on('exit', code => {
    console.log(`Exiting with code: ${code}`);
});
process.on('uncaughtExceptionMonitor', error => {
    console.log(error);
});
console.log('error handler loaded')


