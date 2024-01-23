import fs from 'node:fs/promises'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const character = 'т'
    const pattern = new RegExp(`^[аъоуеияюхщ]*${character}[аъоуеияюхщ]*$`, 'i');
    let allMatch = []

    const filePath = 'src/lib/server/data/all-cyrillic.txt'
    try {
        const words = await fs.readFile(filePath, 'utf-8')
        const lines = words.split('\n')
        for (let line of lines) {
            line = line.trim();

            if (pattern.test(line)) {
                allMatch.push(line)
            }
        }



    } catch (error) {
        console.error(error)
    }







    return {
        allMatch
    };
};


/** @type {import('./$types').Actions} */
// /** @type {import('./$types').Actions} */
export const actions = {
    getCharacters: async (event) => {
        const formData = await event.request.formData()
        const character = formData.get('characters')
        console.log('character');
        console.log({ character });
    }
}