class search {

    constructor(searchInput) {

    }
    executeSearch() {
        fetch('api.openweathermap.org/data/2.5/weather?q={searchInput}&appid={8d141e7ff86b157ab911daed7c1b290b}')
        .then(Response => {
            if(Response.ok) {
                return Response.json()
            }
            throw new error('Request failed')
        }, networkError => {
            console.log(networkError.message);
        })
        .then(jsonResponse => {
            console.log(jsonRespose)
        })        
    }
}

