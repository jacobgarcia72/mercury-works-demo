import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import fetchJoke from "../../utilities/fetchJoke";
import styles from './styles.module.css';

const JokeViewer = () => {

    const [joke, setJoke] = useState();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPunchline, setShowPunchline] = useState(false);

    const getNewJoke = () => {
        const handleError = (err) => {
            console.error(err);
            setIsError(true);
        }
        setJoke(null);
        setIsError(false);
        setIsLoading(true);
        setShowPunchline(false);
        fetchJoke(setJoke, handleError, () => setIsLoading(false));
    }

    useEffect(getNewJoke, []);

    return (
        <div className={styles.jokeViewer}>
            <header>
                <input
                    type="button"
                    onClick={getNewJoke}
                    className={styles.mainButton}
                    value="Get A New Random Joke"
                    />
                <a href="https://karljoke.herokuapp.com/">View API Docs</a>
            </header>
            <main>
                {isLoading && <div className={styles.loading}>Loading your joke...</div>}
                {isError && <div className={styles.error}>There was an error loading your joke.</div>}
                {joke && (
                    <section>
                        <div className={styles.setup}><FontAwesomeIcon icon={faQuoteLeft} /><p>{joke.setup}</p></div>
                        <input
                            type="button"
                            onClick={() => setShowPunchline(!showPunchline)}
                            value={`${showPunchline ? 'Hide' : 'Show'} Punchline`}
                            />
                        {showPunchline && <div className={styles.punchline}><p>{joke.punchline}</p><FontAwesomeIcon icon={faQuoteRight} /></div>}
                    </section>
                )}
            </main>
        </div>
    )
}

export default JokeViewer;