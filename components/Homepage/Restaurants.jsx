import { useEffect, useState } from "react"
import RestaurantCard from "./RestaurantCard"
import Shimmer from "./shimmer"
import filters from "./Filters"
import Filters from "./Filters"
import { Link } from "react-router-dom"
import { ImagesCDN } from "../../utils/data/constants"
import { useRestaurants } from "../../utils/data/useRestaurants"
import { useLocations } from "../../utils/data/useLocation"


export default Restaurants =(props)=>{

  const [lat,long] = useLocations();
   const [Restaurants,setRestaurants,filteredRestaurants,setFilteredRestaurant,categories,title] = useRestaurants(lat,long);

  
    const [ searchterm,setSearch]=useState('');
    const [filterDialogOpen,setFilterDialog]=useState(false)
console.log("filter",filteredRestaurants)
    const myMap = new Map();
    const [filters,setFilters]=useState({});

    myMap.set("Sort",["Rating","Delivery Time"])
    myMap.set("Cuisines",["Afghani","North Indian","Asian","Cafe","Briyani","Chinese","South Indian"])
    myMap.set("Ratings",["4.5+","4.0+","3.5+"])

    useEffect(()=>{

        search(searchterm);
      },[searchterm])
      useEffect(()=>{
        if(Restaurants.length>0){
           props.loaded(true);

        }
        props.getCategories(categories)
      },[Restaurants])
 



   const  filter=()=>{
       setFilterDialog(true)
      //  setRestaurant( Restaurants.filter(e=>e.info.avgRating>4.2));
    }
    const getfilters=(filters)=>{
      setFilters(filters)
    }
    useEffect(()=>{
      setFilterDialog(false);
     const  filteredRes=filteredRestaurants.filter((res)=>{
               
      })
      
    },[filters])
    const search = (term) => {

        const filteredRestaurants = Restaurants.filter((restaurant) =>
          restaurant.info.name.toLowerCase().includes(term.toLowerCase())
        );

        setFilteredRestaurant(filteredRestaurants);
      };
      
    const handleInputChange = (e) => {
          
        setSearch(e.target.value)
      
      };
  
    return filteredRestaurants?.length===0?<Shimmer/>:(
   
    <div className="res-container">

         {
         filterDialogOpen===true && <div style={{position:"fixed",top:"22%",left:"25%"}}>
          <Filters data={myMap} sendFilters = {getfilters} ></Filters>
          </div>
          }

    <div style={{display:"flex"}}>
     <div className="heading"> {title} </div>
        

</div>
<div className="options">
    <div className="searchbar">
        <input  type="text" name="res" id="restSearch" placeholder="Search"  onChange={(e)=>handleInputChange(e)} />
    </div>
<div className="filter h-9" onClick={()=>filter()}>
   Filter
</div>
<div className="filter h-9" onClick={()=>filter()}>
   Sort
</div>
</div>

 <div className="flex flex-wrap" >
  
     {
        
     filteredRestaurants?.map((item,index)=>(

  
        <Link  key={index} style={{textDecoration:"none"}} to={"/restaurant/"+item.info.id}> <RestaurantCard restaurant = {item?.info} index={index} cdn={ImagesCDN}/></Link>
        

     ))
     }

</div>
 
       

    </div>
    )
}



