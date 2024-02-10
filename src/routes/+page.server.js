import fs from 'node:fs/promises'
import { allowed } from './sverdle/words.server';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // const character = 'т'
    // const pattern = new RegExp(`^[аъоуеияюхщ]*${character}[аъоуеияюхщ]*$`, 'i');
    // let allMatch = []

    // const filePath = 'src/lib/server/data/all-cyrillic.txt'
    // try {
    //     const words = await fs.readFile(filePath, 'utf-8')
    //     const lines = words.split('\n')
    //     for (let line of lines) {
    //         line = line.trim();

    //         if (pattern.test(line)) {
    //             allMatch.push(line)
    //         }
    //     }



    // } catch (error) {
    //     console.error(error)
    // }







    return {};
};


/** @type {import('./$types').Actions} */
// /** @type {import('./$types').Actions} */
export const actions = {
    getCharacters: async (event) => {
        const formData = await event.request.formData()
        const character = formData.get('characters')
        let allMatch = []

        const pattern = new RegExp(`^[аъоуеияюхщ]*${character}[аъоуеияюхщ]*$`, 'i')

        const filePath = 'src/lib/server/data/all-cyrillic.txt'
        try {
            const words = await fs.readFile(filePath, 'utf-8')
            const lines = words.split('\n')

            for (let word of lines) {
                word = word.trim()

                if (pattern.test(word)) {
                    allMatch.push(word)
                }
            }
        } catch (error) {
            console.error(error)
        }

        // console.log('character');
        // console.log({ character });
        return { success: true, data: allMatch }

    }
}