import Scraper from '@SumiFX/Scraper'; // Importa el módulo Scraper para realizar scraping de datos

// Define la función 'handler' que será ejecutada cuando se invoque el comando 'play'
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    // Verifica si se proporcionó un texto (título de video o canción de YouTube)
    if (!text) return conn.reply(m.chat, '🍭 Ingresa el título de un video o canción de YouTube.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* Gemini Aaliyah - If Only`, m);

    // Obtiene los datos del usuario desde la base de datos (no se usa en este fragmento de código)
    let user = global.db.data.users[m.sender];

    try {
        // Busca en YouTube el texto proporcionado y obtiene el primer resultado
        let res = await Scraper.ytsearch(text);
        
        // Obtiene el título, tamaño, calidad, miniatura y URL de descarga del video en formato mp3
        let { title, size, quality, thumbnail, dl_url } = await Scraper.ytmp3(res[0].url);
        
        // Verifica si el tamaño del archivo es mayor a 200 MB y cancela la descarga si es así
        if (size.includes('GB') || size.replace(' MB', '') > 200) {
            return await m.reply('El archivo pesa más de 200 MB, se canceló la descarga.');
        }

        // Crea un mensaje de texto con los detalles del video
        let txt = `╭─⬣「 *YouTube Play* 」⬣\n`;
        txt += `│  ≡◦ *🍭 Título ∙* ${title}\n`;
        txt += `│  ≡◦ *📅 Publicado ∙* ${res[0].published}\n`;
        txt += `│  ≡◦ *🕜 Duración ∙* ${res[0].duration}\n`;
        txt += `│  ≡◦ *👤 Autor ∙* ${res[0].author}\n`;
        txt += `│  ≡◦ *⛓ URL ∙* ${res[0].url}\n`;
        txt += `│  ≡◦ *🪴 Calidad ∙* ${quality}\n`;
        txt += `│  ≡◦ *⚖ Peso ∙* ${size}\n`;
        txt += `╰─⬣`;

        // Envía la miniatura y el mensaje de texto al chat
        await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m);

        // Envía el archivo de audio al chat
        await conn.sendFile(m.chat, dl_url, title + '.mp3', `*🍭 Título ∙* ${title}\n*🪴 Calidad ∙* ${quality}`, m, false, { mimetype: 'audio/mpeg', asDocument: user.useDocument });
    } catch (e) { // Captura cualquier error que ocurra durante la ejecución del código anterior
        console.error(e); // Muestra el error en la consola para facilitar la depuración
    }
};

// Define la ayuda, etiquetas y comando asociado a la función 'handler'
handler.help = ["play <búsqueda>"]; // Define el texto de ayuda para el comando 'play'
handler.tags = ["downloader"]; // Define las etiquetas asociadas a la función 'handler'
handler.command = ["play"]; // Define el comando asociado a la función 'handler'
handler.register = true; // Indica que la función 'handler' debe ser registrada para su uso en el bot
// handler.limit = 1 // Define un límite de uso para la función 'handler' (opcional, no está activado en este caso)

// Exporta la función 'handler' para que pueda ser utilizada por otros módulos
export default handler;
                                                                            
