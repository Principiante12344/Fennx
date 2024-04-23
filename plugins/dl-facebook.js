import Scraper from '@SumiFX/Scraper' // Importa el módulo Scraper desde '@SumiFX/Scraper'

// Define un manejador de eventos asincrónico para el comando 'facebook'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    // Verifica si se proporcionó un argumento (enlace del vídeo de Facebook)
    if (!args[0]) return m.reply('🍭 Ingresa el enlace del vídeo de FaceBook junto al comando.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://www.facebook.com/official.trash.gang/videos/873759786348039/?mibextid=rS40aB7S9Ucbxw6v`)

    try {
        // Utiliza el módulo Scraper para obtener el título, la URL en definición estándar (SD) y la URL en alta definición (HD) del vídeo de Facebook
        let { title, SD, HD } = await Scraper.fbdl(args[0])
        // Envía el vídeo con la URL en alta definición (HD) o en definición estándar (SD), junto con el título como pie de foto
        await conn.sendMessage(m.chat, { video: { url: HD || SD }, caption: `*🍭 Titulo ∙* ${title}` }, { quoted: m })
    } catch {
        // Captura cualquier error que ocurra durante el proceso
    }
}

handler.help = ['facebook <url fb>'] // Define la ayuda para el comando 'facebook'
handler.tags = ['downloader'] // Etiqueta el comando como un descargador
handler.command = ['fb', 'fbdl', 'facebookdl', 'facebook'] // Define los comandos relacionados con 'facebook'
handler.register = true // Indica que el manejador debe registrarse en el bot
//handler.limit = 1 // Define un límite para el uso del comando (comentado en este caso, por lo que no se aplica)
export default handler // Exporta el manejador como predeterminado
    
