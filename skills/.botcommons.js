//
// Command: bot commons
//
module.exports = function (controller) {

    controller.hears(["^\.about", "^\.commons", "^\.bot", "^ping"], 'direct_message,direct_mention', function (bot, message) {
        var metadata = '{\n'
            + '   "owner"       : "' + bot.commons["owner"] + '",\n'
            + '   "support"     : "' + bot.commons["support"] + '",\n'
            + '}\n';
        bot.reply(message, '```json\n' + metadata + '\n```');
    });
}
