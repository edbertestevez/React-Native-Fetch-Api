var api = {
	getRovers(){
		var url = `https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=OHPnoxFnYDKpxqwoGKgrrsIVx5V2dj0RmMO9yzV5`;
		return fetch(url).then((res) => res.json());
	}
};

module.exports = api;