const BASE_URL = "https://your-backend.com/api";

export const request = async (endpont,option={})=>{
    try{
        const res = await fetch(`${BASE_URL}${endpont}`,option)

        if(!res.ok){
            throw new Error(errorData.message || "API Error");
        }
        const data = res.json()
    }catch(error){
        throw error
    }
}
