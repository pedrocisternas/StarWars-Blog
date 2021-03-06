const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			apiAddress: "https://3000-tan-cheetah-quo5qis1.ws-us15.gitpod.io/",
			user: "nate",
			favorites: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			login: () => {
				fetch(getStore().apiAddress + "/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						username: "nate",
						password: "234"
					})
				})
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						if (response.status == 401) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(function(responseAsJson) {
						// console.log(responseAsJson);
						// setStore({ user: responseAsJson.token });
						localStorage.setItem("token", responseAsJson.token);
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			getHello: () => {
				const token = localStorage.getItem("token");
				fetch(getStore().apiAddress + "/hello", {
					method: "GET",
					headers: { Authorization: "Bearer " + token }
				})
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(function(responseAsJson) {
						// console.log(responseAsJson);
						setStore({ favorites: responseAsJson.favorites });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			loadFavorites: () => {
				fetch(getStore().apiAddress + "/" + getStore().user + "/favorites")
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(function(responseAsJson) {
						// console.log(responseAsJson);
						setStore({ favorites: responseAsJson.favorites });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			addToFavorites: (name, id, entity_type) => {
				if (entity_type == "planet") {
					var type = "/favorite/planet/";
				} else {
					var type = "/favorite/person/";
				}
				fetch(getStore().apiAddress + type + id, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name: name,
						username: getStore().user
					})
				})
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(function(responseAsJson) {
						// console.log(responseAsJson);
						setStore({ favorites: responseAsJson.favorites });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			removeFromFavorites: (id, entity_type) => {
				if (entity_type == "planet") {
					var type = "/favorite/planet/";
				} else {
					var type = "/favorite/person/";
				}
				fetch(getStore().apiAddress + type + id, {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						username: getStore().user
					})
				})
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(function(responseAsJson) {
						// console.log(responseAsJson);
						setStore({ favorites: responseAsJson.favorites });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			}
			// index => {
			// 	const newFavorites = getStore().favorites;
			// 	let newArray = newFavorites.filter((e, i) => i != index);
			// 	setStore({ favorites: newArray });
			// }
		}
	};
};

export default getState;
