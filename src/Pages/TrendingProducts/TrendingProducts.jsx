import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ProductCard from "../../Components/ProductCard/ProductCard";


const TrendingProducts = () => {
    const axiosPublic = useAxiosPublic()
    const {data: trendingProducts= [], isLoading:trendingLoading, refetch} = useQuery({
    queryKey: ['trendingProducts'],   
        queryFn: async () => {
            const {data} = await axiosPublic('/trending');
            return data

        }
    })
    if(trendingLoading) return <span className="loading loading-dots loading-lg"></span>
    return (
        <div>
          <h2 className="text-3xl  font-bold text-center my-6">
            {" "}
            Trending Products
         </h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {
           
            trendingProducts.map(product => <ProductCard refetch={refetch} product={product} key={product._id}></ProductCard>)
         }
      </div>
     </div>
    );
};

export default TrendingProducts;