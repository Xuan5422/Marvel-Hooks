import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';

    const _apiKey = 'apikey=60670b5407686b2a4a3a9be0bdf27976';
    const _baseOffset = 210;



/*     getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
        return res.json();
    } */
        const getAllComics = async (offset = 0) => {
            const res = await request(`${_apiBase}comics?orderBy=title&limit=8&offset=${offset}&${_apiKey}`);
            return res.data.results.map(item => {
                return {
                    id: item.id,
                    name: item.title,
                    thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
                    url: item.resourceURI,
                    price: item.prices[0].price
                }
            });
        }

        const getComic = async (id) => {
            const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
            return _transformComics(res.data.results[0]);
        };

    
        const getAllCharacters = async (offset = _baseOffset) => {
            
            const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
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
    
        const getCharacter = async (id) => {
            const resp = await request(`${_apiBase}characters/${id}?${_apiKey}`);
            return _transformCharacter(resp)
        }
    
        const _transformCharacter = (resp) => {
    
            return {
                id: resp.data.results[0].id,
                name: resp.data.results[0].name,
                description: resp.data.results[0].description,
                thumbnail: resp.data.results[0].thumbnail.path + '.' + resp.data.results[0].thumbnail.extension,
                homepage: resp.data.results[0].urls[0].url,
                wiki: resp.data.results[0].urls[1].url,
                comics: resp.data.results[0].comics,
            }
        }

        const _transformComics = (comics) => {
            return {
                id: comics.id,
                title: comics.title,
                description: comics.description || "There is no description",
                pageCount: comics.pageCount
                    ? `${comics.pageCount} p.`
                    : "No information about the number of pages",
                thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
                language: comics.textObjects[0]?.language || "en-us",
                price: comics.prices[0].price
                    ? `${comics.prices[0].price}$`
                    : "not available",
            };
        };

        const getCharacterName = async (name) => {
            const resp = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
            return resp.data.results.length ? _transformCharacter(resp) : null;
        }
    


    
    return {loading, error, getCharacterName, getCharacter, getAllCharacters, getAllComics, getComic, clearError}
}

export default useMarvelService;