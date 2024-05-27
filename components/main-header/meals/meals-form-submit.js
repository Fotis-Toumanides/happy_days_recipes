'use client';

import {useFormStatus} from 'react-dom';


export default function MealsFormSubmit(){
    const {pending} = useFormStatus();  // This gives us an object from which we need the pedding property

    return(
        <button disabled={pending}>{pending ? 'Submiting...' : 'Share Meal'}</button>
    )
}