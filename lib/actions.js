'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

  // This and 'use client' are called directives 
// This creates a server action, a function that will execute only on the server
// and then can be used as a value in the form component

function isInvalidText(text){
  return(!text || text.trim() === '');
}

export async function shareMeal(prevState, formData){    

    const meal = {
        title: formData.get('title'),   // store the value of the input with name 'title'.
        summary: formData.get('summary'),
        instructions: formData.get('instructions'), 
        image: formData.get('image'), 
        creator: formData.get('name'), 
        creator_email: formData.get('email'), 
    };

    if(isInvalidText(meal.title) || 
      isInvalidText(meal.summary) || 
      isInvalidText(meal.instructions) || 
      isInvalidText(meal.creator) || 
      isInvalidText(meal.creator_email) || 
      !meal.creator_email.includes('@') ||
      !meal.image || meal.image.size === 0
    ){
      return {
        message: 'Invalid data'
      }
    }
    await saveMeal(meal); // saveMeal() will return a promise and store the file and the data to the backend server
    revalidatePath('/meals');   // This will tell Next to throw away the cached data and revalidate for this page only(meals)
    return redirect('/meals');

}