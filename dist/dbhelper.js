class DBHelper{static get DATABASE_URL(){return"http://localhost:8000/data/restaurants.json"}fetchRestaurants(e){let t=new XMLHttpRequest;t.open("GET",DBHelper.DATABASE_URL),t.onload=(()=>{if(200===t.status){const r=JSON.parse(t.responseText).restaurants;e(null,r)}else e(`Request failed. Returned status of ${t.status}`,null)}),t.send()}fetchRestaurantById(e,t){this.fetchRestaurants((r,s)=>{if(r)t(r,null);else{const r=s.find(t=>t.id==e);r?t(null,r):t("Restaurant does not exist",null)}})}fetchRestaurantByCuisine(e,t){this.fetchRestaurants((r,s)=>{if(r)t(r,null);else{const r=s.filter(t=>t.cuisine_type==e);t(null,r)}})}fetchRestaurantByNeighborhood(e,t){this.fetchRestaurants((r,s)=>{if(r)t(r,null);else{const r=s.filter(t=>t.neighborhood==e);t(null,r)}})}fetchRestaurantByCuisineAndNeighborhood(e,t,r){this.fetchRestaurants((s,a)=>{if(s)r(s,null);else{let s=a;"all"!=e&&(s=s.filter(t=>t.cuisine_type==e)),"all"!=t&&(s=s.filter(e=>e.neighborhood==t)),r(null,s)}})}fetchNeighborhoods(e){this.fetchRestaurants((t,r)=>{if(t)e(t,null);else{const t=r.map((e,t)=>r[t].neighborhood),s=t.filter((e,r)=>t.indexOf(e)==r);e(null,s)}})}fetchCuisines(e){this.fetchRestaurants((t,r)=>{if(t)e(t,null);else{const t=r.map((e,t)=>r[t].cuisine_type),s=t.filter((e,r)=>t.indexOf(e)==r);e(null,s)}})}urlForRestaurant(e){return`./restaurant.html?id=${e.id}`}imageUrlForRestaurant(e){return`/img/${e.photograph}`}imageSrcsetForRestaurant(e,t){const r=e.photograph.replace(".jpg","");return`/img/${r}_200.${t} 200w, /img/${r}_300.${t} 300w, /img/${r}_400.${t} 400w, /img/${r}.${t} 800w`}pictureForRestaurant(e,t,r){const s=document.createElement("source");s.srcset=this.imageSrcsetForRestaurant(t,"webp"),s.sizes=r,s.type="image/webp",e.append(s);const a=document.createElement("img");return a.src=this.imageUrlForRestaurant(t,"jpg"),a.srcset=this.imageSrcsetForRestaurant(t,"jpg"),a.sizes=r,a.width=800,a.alt=`${t.name} located in ${t.neighborhood}`,a.className="restaurant-img",e.append(a),e}mapMarkerForRestaurant(e){return new google.maps.Marker({position:e.latlng,title:e.name,url:this.urlForRestaurant(e),map:window.map,animation:google.maps.Animation.DROP})}ratingAverageForRestaurant(e){let t=0,r=0;return e.reviews&&e.reviews.forEach(e=>{e.rating&&(++t,r+=e.rating)}),t>0?Math.round(r/t*2)/2:0}ratingHtmlForRestaurant(e){let t="";for(let r=1;r<6;++r)t+=e>=r?"🌑":e+.5==r?"🌓":"🌕";return t}}window.dbhelper=new DBHelper;