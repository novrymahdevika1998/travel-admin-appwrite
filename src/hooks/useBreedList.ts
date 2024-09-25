import { useQuery } from "@tanstack/react-query";
import { fetchBreedList } from "../services/breeds";

const useBreedList = (animal: string) => {
  const { data, status } = useQuery({ queryKey: ["breeds", animal], queryFn: fetchBreedList })

  return { breedList: data?.breeds ?? [], status }
}

export default useBreedList