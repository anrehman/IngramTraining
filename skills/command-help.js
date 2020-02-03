//
// Command: help
//
module.exports = function (controller) {

    controller.hears(["help", "who"], 'direct_message,direct_mention', function (bot, message) {
        var text = "\n Soy un bot creado por informacion para el clima de Madrid.";
        text += "Por favor, escriba: ";
        text += "\n- " + bot.enrichCommand(message, "weather") + " para ver el clima";
        text += "\n- " + bot.enrichCommand(message, "rating") + " para valorar tu experiencia con el bot";
        
        bot.reply(message, text);
    });
}
