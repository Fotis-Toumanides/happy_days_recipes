import MealsGrid from '@/components/main-header/meals/meals-grid';
import classes from './page.module.css';
import Link from "next/link";
import { getMeals } from '@/lib/meals';
import { Suspense } from 'react';

export const metadata = {
    title: 'All Recipes',
    description: 'All the meals were shared by our community.',
  };
  
async function Meals(){
    const meals = await getMeals();

    return <MealsGrid meals={meals}/>
}
export default function MealsPage(){
    
    return(
        <>
            <header className={classes.header}>
                <h1>Delicious meals created{' '}<span className={classes.highlight}>by you</span></h1>
                <p>Choose your favorite recipe and cook it. It is easy and fun!</p>
                <p className={classes.cta}>
                    <Link href='/meals/share'>Share your favorite recipe</Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<p className={classes.loading}>Getting those meals...</p>}>
                    <Meals /> {/* This is the async function on top. We render what we don't fetch from the backend we show fallback untill fetching data */}
                </Suspense>
            </main>
        </>
    )
}