import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

// Getting all the meals
export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // throw new Error('Failed to load meals');
    return db.prepare('SELECT * FROM meals').all();  // all() is used when fetching all data, get() when fetching 1 row. When inserting data we use run()
};

// Getting a specific meal using its slug
export function getMeal(slug){
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal){
    meal.slug = slugify(meal.title, {lower:true});  //make sure all characters are lowercase
    meal.instructions = xss(meal.instructions);    // removing any harmfull thing 

    // Writing the image to the file
    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;
    const stream = fs.createWriteStream(`public/images/${fileName}`);   // This will create a stream that allows us to write data to a certain file
    const bufferedImage = await meal.image.arrayBuffer();   // We must create first this buffer to write then the image. This is creating a promise

    stream.write(Buffer.from(bufferedImage, (error) => {   //We need the stream, the thing we're going to write and a function that will execute once it's done writing
        if(error){
            throw new Error('Unable to save image');
        }
    }));


    // We don't save the image in the database, we only save its path but removing the "public" from it, because all requests for images will be sent to public folder automaticaly.
    meal.image = `/images/${fileName}`

    // Saving the meal object ot the database
    db.prepare(`
        INSERT INTO meals
        (title, summary, instructions, creator, creator_email, image, slug)
        VALUES(
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `).run(meal);    //bettersqlite will automatically extruct the data and place the values. We need to have the same order of keys and values.
}