module.exports = {
    getPath:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().toLocaleTimeString().replaceAll(":","-")}`,
    date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().toLocaleTimeString()}`
};