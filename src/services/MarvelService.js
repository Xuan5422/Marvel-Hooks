

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    // https://gateway.marvel.com:443/v1/public/characters?apikey=60670b5407686b2a4a3a9be0bdf27976
    _apiKey = 'apikey=60670b5407686b2a4a3a9be0bdf27976';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
        return res.json();
    }

    getAllCharacters = async (offset) => {
        
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
                    homepage: item.urls[0].url,
                    wiki: item.urls[1].url,
                }
            });

    }

    getCharacter = async (id) => {
        const resp = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(resp)
    }

    _transformCharacter = (resp) => {

        return {
            name: resp.data.results[0].name,
            description: resp.data.results[0].description,
            thumbnail: resp.data.results[0].thumbnail.path + '.' + resp.data.results[0].thumbnail.extension,
            homepage: resp.data.results[0].urls[0].url,
            wiki: resp.data.results[0].urls[1].url,
            comics: resp.data.results[0].comics,
        }
    }
}

export default MarvelService;