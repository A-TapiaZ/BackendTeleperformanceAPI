const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


// Trae una lista de juegos, consultada del api de Twitch
exports.getGames = async () => {

    try {
        const response = await fetch('https://api.twitch.tv/helix/games/top?first=50',{
            method: 'get',
            headers: {
                'Authorization': process.env.AuthorizationTwitch,
                'Client-Id': process.env.ClientTwitch
            }
        })

        const data = await response.json();
        return data; 
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error interno'
        })
    }
};

// Trae una lista de juegos, consultada del api de Twitch y retorna solo los Ids.
exports.getIdGames = async (req, res) => {
    
    try {
        let url = 'https://api.twitch.tv/helix/games/top?first=50';

        const response= await fetch(url, {
            method: 'get',
            headers: {
                'Authorization': process.env.AuthorizationTwitch,
                'Client-Id': process.env.ClientTwitch
            }
        })
    
        const data = await response.json();
        let array=[];
    
        data?.data.forEach(element => {
            const {id} = element;
            array.push(id)
        });
    
        return array;
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error interno'
        })
    }
}