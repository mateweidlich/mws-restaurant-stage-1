window.map=null,window.addEventListener("load",()=>{restaurant.fetch(e=>{e?console.error(e):(restaurant.fillBreadcrumb(),window.setTabindex())})}),window.initMap=(()=>{window.map=new google.maps.Map(document.getElementById("map"),{zoom:16,center:restaurant.item.latlng,scrollwheel:!1}),window.dbhelper.mapMarkerForRestaurant(restaurant.item),document.getElementById("map").removeEventListener("click",window.initMap)});class Restaurant{constructor(){this.item=null}fetch(e){if(this.item)return void e(null);const t=window.getParameterByName("id");t?window.dbhelper.fetchRestaurantById(t,(t,n)=>{this.item=n,this.item?(this.fillRestaurantHTML(),e(null)):console.error(t)}):e("No restaurant id in URL")}fillRestaurantHTML(){document.getElementById("restaurant-name").innerHTML=this.item.name,window.dbhelper.pictureForRestaurant(document.getElementById("restaurant-img"),this.item,"(max-width: 575px) 87.338vw, (max-width: 767px) 54.542vw, (max-width: 991px) 36.132vw, 36.835vw"),document.getElementById("restaurant-cuisine").innerHTML=this.item.cuisine_type,document.getElementById("restaurant-address").innerHTML=this.item.address,document.getElementById("restaurant-rating").innerHTML=window.dbhelper.ratingHtmlForRestaurant(window.dbhelper.ratingAverageForRestaurant(this.item)),this.item.operating_hours&&this.fillRestaurantHoursHTML(),this.fillReviewsHTML()}fillRestaurantHoursHTML(){const e=document.getElementById("restaurant-hours");for(let t in this.item.operating_hours){const n=document.createElement("tr"),r=document.createElement("td");r.innerHTML=t,n.appendChild(r);const i=document.createElement("td");i.innerHTML=this.item.operating_hours[t],n.appendChild(i),e.appendChild(n)}}fillReviewsHTML(){const e=document.getElementById("reviews-container"),t=document.createElement("h3");if(t.innerHTML="Reviews",e.appendChild(t),!this.item.reviews){const t=document.createElement("p");return t.innerHTML="No reviews yet!",void e.appendChild(t)}const n=document.getElementById("reviews-list");this.item.reviews.forEach(e=>{n.appendChild(this.createReviewHTML(e))}),e.appendChild(n)}createReviewHTML(e){const t=document.createElement("li"),n=document.createElement("div"),r=document.createElement("p");r.className="reviewer-name",r.innerHTML=e.name,n.appendChild(r);const i=document.createElement("div"),a=document.createElement("p");a.className="reviewer-date",a.innerHTML=e.date,i.appendChild(a);const d=document.createElement("p");d.className="reviewer-rating",d.setAttribute("aria-label","Rating: "+e.rating+" of 5"),d.innerHTML=window.dbhelper.ratingHtmlForRestaurant(e.rating),i.appendChild(d),n.appendChild(i),t.appendChild(n);const s=document.createElement("p");return s.className="reviewer-comment",s.innerHTML=e.comments,t.appendChild(s),t}fillBreadcrumb(){const e=document.getElementById("breadcrumb"),t=document.createElement("li");t.innerHTML=this.item.name,t.setAttribute("aria-current","page"),e.appendChild(t)}}const restaurant=new Restaurant;