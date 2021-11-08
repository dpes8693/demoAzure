// Define subscriptionkey, tileset and stateset
const subscriptionKey = "-JtDH6QXJsjcn0Vpsj2A_hoM9yuo7VlVkyRNGDretUs";
const tilesetId = "4c7069f6-f1ae-8529-99ea-1918c8fb80d8";
const statesetId = "3577ceb1-f365-958d-92d5-5b6d7b7304ca";
// Define subscriptionkey, tileset and stateset
var map;
function GetMap(){
	
	// Create azure map
	map = new atlas.Map("map-id", {
		center: [120.67397132513491, 24.30318409195953]	,
		style: "auto",
		view: 'Auto',
		authOptions: { 
			authType: 'subscriptionKey',
			subscriptionKey: subscriptionKey
		},
		zoom: 20,
	});
	// Set ready function to let indoor map work
	map.events.add('ready', function () {
		
		// Add a map style selection control.
		map.controls.add(new atlas.control.StyleControl({ mapStyles: "all" }), { position: "top-left" });

		// Create an indoor map manager.
		indoorManager_use = new atlas.indoor.IndoorManager(map, {
			theme: "light",
			tilesetId: tilesetId,
			statesetId: statesetId
		});

		// Add a level control to the indoor manager.
		indoorManager_use.setOptions({
			levelControl: new atlas.control.LevelControl({ position: 'top-left' })
		});
		
		
		// Dynamic stying indoor map info
		if (statesetId.length > 0) {
		  indoorManager_use.setDynamicStyling(true);
		}

		
		//Add click event function to azure map
		map.events.add('click', function(e){
            var features = map.layers.getRenderedShapes(e.position, 'unit');
			if(features[0]){
				const name = features[0].properties.name;
				const unit = features[0].properties.featureId;
				const node = document.getElementById("text-area");
				// 打開註解
				if(unit){
					removeElementsByClass("row")
					const promise = get_data_from_DT_by_ID(unit)
					// create Map for all atrributes
					var count = 0;
					var propMap = new Map()
					promise.then((data) => {
						for( var property in data.data) {
							if(property[0] != "$"){
								console.log(property, data.data[property]);
								propMap.set(property, data.data[property]);
							} 
						}
					}).then(() => {
						var ref = document.getElementById("popoutdivider");
						// check if attributes is attached or not
						if(ref.nextElementSibling == null){
							for(const[key, value] of propMap){
								count += 1
								createAttributes(node, count, key, value);
							}
						}
					})
					if(name){
						// set machine name
						document.getElementById("unitname").innerHTML = name + "(機台名稱)";
					}
					if(unit){
						document.getElementById("unitId").innerHTML = unit;
					}
				}
				openPopup();
				
			}
		});
		
	});
}
function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}
// create attributes on html
function createAttributes(node, count, feature_name, feature_value){
	const rowdiv = document.createElement("div");
	rowdiv.classList.toggle('row');

	const numberbox = document.createElement("div");
	numberbox.classList.toggle('numberbox');
	numberbox.innerHTML = count

	const featurecontainer = document.createElement("div");
	featurecontainer.classList.toggle('feature-container');

	const feature = document.createElement("div");
	feature.classList.toggle('featuretext');
	feature.innerHTML = feature_name + ": "

	const value = document.createElement("div");
	value.classList.toggle("featuretext")
	value.innerHTML = feature_value

	featurecontainer.appendChild(feature)
	featurecontainer.appendChild(value)
	rowdiv.appendChild(numberbox)
	rowdiv.appendChild(featurecontainer)
	node.appendChild(rowdiv)

}

function closePopup() {
    var popup = document.getElementById("popup");
    popup.classList.remove("show");
	removeElementsByClass("row")
}

function openPopup() {
    var popup = document.getElementById("popup");
    popup.classList.toggle("show");
}


async function get_data_from_DT_by_ID(unit){
	var request = {
		"unit_name": unit,
	}
	const url = "https://mapspart2function.azurewebsites.net/api/HttpTrigger1?code=0wiBNnBBeN3eM/KOrfGmY3vuJCJc1H1xAZG0rIEH9ZHU2WACDcRPrA=="
	try {
		
		const response = await axios.post(url, request)
		return response
	  } catch (errors) {
		console.error(errors);
	  }
	
}