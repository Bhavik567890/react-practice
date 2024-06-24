export const RevealResults = async() =>{
    const response = await fetch("http://localhost:5000/scratch");
    return await response.json()
}