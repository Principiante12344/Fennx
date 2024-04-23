import Scraper from '@SumiFX/Scraper'; // Importa el módulo Scraper para realizar scraping de datos

// Define la función 'handler' que será ejecutada cuando se invoque el comando 'tiktok'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    // Verifica si se proporcionó un argumento (enlace del vídeo de TikTok)
    if (!args[0]) return m.reply('🍭 Ingresa un enlace del vídeo de TikTok junto al comando.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://vm.tiktok.com/ZMMCYHnxf/`);

    try {
        // Obtiene el título, fecha de publicación, calidad, cantidad de likes, cantidad de comentarios,
        // cantidad de veces compartido, cantidad de visitas y URL de descarga del vídeo de TikTok
        let { title, published, quality, likes, commentCount, shareCount, views, dl_url } = await Scraper.tiktokdl(args[0]);
        
        // Crea un mensaje de texto con los detalles del vídeo de TikTok
        let txt = `╭─⬣「 *TikTok Download* 」⬣\n`;
        txt += `│  ≡◦ *🍭 Título ∙* ${title}\n`;
        txt += `│  ≡◦ *📅 Publicado ∙* ${published}\n`;
        txt += `│  ≡◦ *🪴 Calidad ∙* ${quality}\n`;
        txt += `│  ≡◦ *👍 Likes ∙* ${likes}\n`;
        txt += `│  ≡◦ *🗣 Comentarios ∙* ${commentCount}\n`;
        txt += `│  ≡◦ *💫 Share ∙* ${shareCount}\n`;
        txt += `│  ≡◦ *📹 Visitas ∙* ${views}\n`;
        txt += `╰─⬣`;

        // Envía el vídeo de TikTok y el mensaje de texto al chat
        await conn.sendMessage(m.chat, { video: { url: dl_url }, caption: txt }, { quoted: m });
    } catch (e) { // Captura cualquier error que ocurra durante la ejecución del código anterior
        console.error(e); // Muestra el error en la consola para facilitar la depuración
    }
};

// Define la ayuda, etiquetas y comandos asociados a la función 'handler'
handler.help = ['tiktok <url tt>']; // Define el texto de ayuda para el comando 'tiktok'
handler.tags = ['downloader']; // Define las etiquetas asociadas a la función 'handler'
handler.command = ['tiktok', 'ttdl', 'tiktokdl', 'tiktoknowm']; // Define los comandos asociados a la función 'handler'
handler.register = true; // Indica que la función 'handler' debe ser registrada para su uso en el bot
// handler.limit = 1 // Define un límite de uso para la función 'handler' (opcional, no está activado en este caso)

// Exporta la función 'handler' para que pueda ser utilizada por otros módulos
export default handler;
