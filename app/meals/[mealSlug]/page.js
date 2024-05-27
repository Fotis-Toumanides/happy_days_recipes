import { notFound } from 'next/navigation';
import { getMeal } from '@/lib/meals';
import classes from './page.module.css';
import Image from 'next/image';

export async function generateMetadata({params}){   // components in page.js receives the "params" prop from NEXT
    const meal = getMeal(params.mealSlug);
    if(!meal){
        notFound();   // Calling this function will stop the execution of this component and will show the closest error page
    }
    return{
        title: meal.title,
        description: meal.summary
    }

} 
export default function MealDetailsPage({params}){   // components in page.js receives the "params" prop from NEXT
    const meal = getMeal(params.mealSlug);   // We use the name we assigned in the [] in that directory( [mealSlug] ) to get the url for the specific meal
    
    if(!meal){
        notFound();   // Calling this function will stop the execution of this component and will show the closest error page
    }
    
    meal.instructions = meal.instructions.replace(/\n/g, '<br/>');   // Insert line breaks where the db has \n 
    return(
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} alt=''fill/>
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p className={classes.instructions} dangerouslySetInnerHTML={{
                    __html: meal.instructions,
                }}></p>
            </main>
        </>
    )
}