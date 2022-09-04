export default (setResult, setError, onComplete) => {
    fetch("https://karljoke.herokuapp.com/jokes/random", {
        method: 'GET',
    })
    .then(res => res.json())
    .then(joke => setResult(joke))
    .catch(err => setError(err))
    .finally(() => { if (onComplete) onComplete() });
}