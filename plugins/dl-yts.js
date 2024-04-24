import Scraper from "@SumiFX/Scraper" // Importa el módulo Scraper desde "@SumiFX/Scraper"

// Define un manejador de eventos asincrónico para el comando 'ytsearch'
let handler = async (m, { conn, usedPrefix, command, text }) => {
    // Verifica si se proporcionó un argumento (título de un video o canción de YouTube)
    if (!text) return conn.reply(m.chat, '🍭 Ingresa el título de un video o canción de YouTube.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* Gemini Aaliyah - If Only`, m)
    // Realiza una búsqueda en YouTube del texto proporcionado y obtiene los resultados
    let results = await Scraper.ytsearch(text)
    // Verifica si se encontraron resultados
    if (!results || !results.length) return conn.reply(m.chat, `No se encontraron resultados.`, m)
    // Obtiene la URL de la miniatura del primer resultado
    let img = results[0].thumbnail
    // Construye un mensaje con los detalles de cada resultado
    let txt = `╭─⬣「 *YouTube Search* 」⬣\n`
    results.forEach((video, index) => {
        txt += ` │  ≡◦ *🐢 Nro ∙* ${index + 1}\n`
        txt += ` │  ≡◦ *🍭 Titulo ∙* ${video.title}\n`
        txt += ` │  ≡◦ *🕜 Duración ∙* ${video.duration}\n`
        txt += ` │  ≡◦ *🪴 Publicado ∙* ${video.published}\n`
        txt += ` │  ≡◦ *📚 Autor ∙* ${video.author}\n`
        txt += ` │  ≡◦ *⛓ Url ∙* ${video.url}\n`
        txt += ` ╰──────────⬣`
        txt += `\n`
    })
    // Envía la miniatura y el mensaje con los detalles de los resultados al chat
    await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m)
}

handler.help = ['ytsearch <búsqueda>'] // Define la ayuda para el comando 'ytsearch'
handler.tags = ['search'] // Etiqueta el comando como de búsqueda
handler.command = ['ytsearch', 'yts'] // Define los comandos relacionados con 'ytsearch'
handler.register = true // Indica que el manejador debe registrarse en el bot

export default handler // Exporta el manejador como predeterminado
