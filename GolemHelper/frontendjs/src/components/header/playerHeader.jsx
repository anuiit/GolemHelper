import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useFetchData from "@/hooks/useFetchData";

export default function PlayerHeader({ searchQuery }) {
  const { data, loading } = useFetchData("headerData", searchQuery);
  console.log("playerHeader: ", data);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    data && (
      <div className="w-full py-6">
        <div className="grid grid-cols-3">
          <div className="flex flex-row items-start justify-start items-center">
            <Avatar className="w-28 h-28 border-4 border-vulcan-800 rounded-md">
              <AvatarImage className="rounded-lg" src={data.profileIcon} alt={data.name} />
              <AvatarFallback>{data.name}</AvatarFallback>
            </Avatar>
            <div className="ml-8 flex flex-col">
              <div className="flex gap-2 items-center">
                <h1 className="text-3xl font-extralight text-vulcan-100">{data.name}</h1>
                <p className="text-xl font-extralight text-vulcan-600 mt-1">#{data.tagline}</p>
              </div>
              <p className="text-lg text-vulcan-400 font-thin">Level {data.level}</p>
            </div>
          </div>

          <div></div> {/* Empty div to occupy 1/3 of the space on the left */}
          
          <div></div> {/* Empty div to occupy 1/3 of the space on the right */}
        </div>
      </div>
    )
  );
}