// loading.js is a reserved name. This file will get active if a file in this directory starts fetching data.
import classes from './loading.module.css';

export default function MealsLoadingPage(){
    return(
        <p className={classes.loading}>Getting those meals...</p>
    )
}