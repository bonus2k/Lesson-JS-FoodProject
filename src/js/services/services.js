function getZero(num) {
    return (num >= 0 && num < 10) ? `0${num}` : `${num}`
}

async function getData(URL) {
    const data = await fetch(URL);
    if (!data.ok) {
        throw new Error(`Could not fetch ${URL}. Status ${data.status}, code ${data.code}`);
    }
    return await data.json();
}


export {getZero};
export {getData};