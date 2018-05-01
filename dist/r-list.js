window.map=null,window.markers=[],window.addEventListener("load",()=>{restaurantList.fetchNeighborhoods(),restaurantList.fetchCuisines(),restaurantList.updateRestaurants(),document.getElementById("neighborhoods-select").addEventListener("change",restaurantList.updateRestaurants),document.getElementById("cuisines-select").addEventListener("change",restaurantList.updateRestaurants)}),window.initMap=(()=>{window.map=new google.maps.Map(document.getElementById("map"),{zoom:12,center:{lat:40.722216,lng:-73.987501},scrollwheel:!1}),restaurantList.addMarkersToMap(),document.getElementById("map").removeEventListener("click",window.initMap)});class RestaurantList{constructor(){this.restaurants=null,this.neighborhoods=null,this.cuisines=null}fetchNeighborhoods(){window.dbhelper.fetchNeighborhoods((e,t)=>{e?console.error(e):(this.neighborhoods=t,this.fillNeighborhoodsHTML())})}fillNeighborhoodsHTML(){const e=document.getElementById("neighborhoods-select");this.neighborhoods.forEach(t=>{const n=document.createElement("option");n.innerHTML=t,n.value=t,e.append(n)})}fetchCuisines(){window.dbhelper.fetchCuisines((e,t)=>{e?console.error(e):(this.cuisines=t,this.fillCuisinesHTML())})}fillCuisinesHTML(){const e=document.getElementById("cuisines-select");this.cuisines.forEach(t=>{const n=document.createElement("option");n.innerHTML=t,n.value=t,e.append(n)})}updateRestaurants(){const e=document.getElementById("cuisines-select"),t=document.getElementById("neighborhoods-select"),n=e.selectedIndex,s=t.selectedIndex,a=e[n].value,r=t[s].value;window.dbhelper.fetchRestaurantByCuisineAndNeighborhood(a,r,(e,t)=>{e?console.error(e):(restaurantList.resetRestaurants(t),restaurantList.fillRestaurantsHTML(),null!==window.map&&restaurantList.addMarkersToMap()),window.loaded=!0})}resetRestaurants(e){this.restaurants=[],document.getElementById("restaurants-list").innerHTML="",window.markers.length>0&&window.markers.forEach(e=>e.setMap(null)),window.markers=[],this.restaurants=e}fillRestaurantsHTML(){const e=document.getElementById("restaurants-list");if(this.restaurants.length>0)this.restaurants.forEach(t=>{e.append(this.createRestaurantHTML(t))});else{const t=document.createElement("p");t.innerHTML="No restaurants found with the selected filters.",e.append(t)}window.setTabindex()}createRestaurantHTML(e){const t=document.createElement("li");t.id="rr_"+e.id;const n=document.createElement("div");n.id="fav_"+e.id,n.className="restaurant-fav";const s=document.createElement("span");s.setAttribute("aria-label","Mark as favorite");const a="true"===e.is_favorite||!0===e.is_favorite;a&&(s.className="is_fav"),s.innerHTML=a?"★":"☆",s.addEventListener("click",t=>{const n=t.target.classList.contains("is_fav");window.idb.setFavoriteById(e.id,!n).then(()=>{n?(t.target.classList.remove("is_fav"),t.target.innerHTML="☆"):(t.target.classList.add("is_fav"),t.target.innerHTML="★")})}),n.append(s),t.append(n),window.loadAfterReady.push(()=>{const t=window.dbhelper.pictureForRestaurant(document.createElement("picture"),e,"(max-width: 575px) 71.8vw, (max-width: 767px) 40.071vw, (max-width: 991px) 36.944vw, 23.316vw");document.getElementById("rr_"+e.id).insertBefore(t,document.getElementById("fav_"+e.id))});const r=document.createElement("div");r.className="restaurant-data";const i=document.createElement("h2");i.innerHTML=e.name,r.append(i);const o=document.createElement("p");o.innerHTML=e.neighborhood,r.append(o);const d=document.createElement("p");d.innerHTML=e.address,r.append(d),t.append(r);const c=document.createElement("a");return c.innerHTML="View Details",c.href=window.dbhelper.urlForRestaurant(e),t.append(c),t}addMarkersToMap(){this.restaurants.forEach(e=>{const t=window.dbhelper.mapMarkerForRestaurant(e,self.map);google.maps.event.addListener(t,"click",()=>{window.location.href=t.url}),window.markers.push(t)})}}const restaurantList=new RestaurantList;