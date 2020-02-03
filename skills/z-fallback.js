//
// Fallback Command
//
module.exports = function (controller) {

    controller.hears(["(.*)"], 'direct_message,direct_mention', function (bot, message) {
        var mardown = "Perdon! No Entiendo! <br/>Escribe "
            + bot.enrichCommand(message, "help");
            
        bot.reply(message, mardown);
    });
};