export default function Fetching(){
    fetch('http://localhost:9000/furnitures')
        .then(response => response.json())
        .then(data => {
                console.log(data)
            })
        .catch(error => {
                console.error(error);
            });
}