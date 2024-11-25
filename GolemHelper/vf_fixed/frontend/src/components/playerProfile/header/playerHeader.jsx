import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useFetchData from "@/hooks/useFetchData";
import { Skeleton } from "@/components/ui/skeleton";

export default function PlayerHeader({ searchQuery }) {
  const { data, loading } = useFetchData("headerData", searchQuery);
  console.log("playerHeader: ", data);

  if (loading) {
    return (
      <div className="w-full py-6">
        <div className="grid grid-cols-3">
          <div className="flex flex-row items-start justify-start">
            {/* Skeleton for Avatar */}
            <Skeleton className="w-28 h-28 rounded-md" />

            <div className="ml-8 flex flex-col space-y-2">
              {/* Skeleton for Name */}
              <Skeleton className="h-8 w-40 rounded" />
              {/* Skeleton for Level */}
              <Skeleton className="h-6 w-24 rounded" />
            </div>
          </div>

          <div></div> {/* Empty div to occupy 1/3 of the space */}

          <div></div> {/* Empty div to occupy 1/3 of the space */}
        </div>
      </div>
    );
  }

  return (
    data && (
      <div className="w-full py-6">
        <div className="flex">
          <div className="flex flex-row items-start justify-start items-center">
            <Avatar className="w-28 h-28 border-4 border-vulcan-800 rounded-md">
              <AvatarImage src={data.profileIcon} alt={data.name} />
            </Avatar>
            <div className="ml-8 flex flex-col">
              <div className="flex gap-2 items-center">
                <h1 className="text-3xl text-vulcan-100">{data.name}</h1>
                <p className="text-xl text-vulcan-600 mt-1">#{data.tagline}</p>
              </div>
              <p className="text-lg text-vulcan-400">Level {data.level}</p>
            </div>
          </div>

          <div></div> {/* Empty div to occupy 1/3 of the space on the left */}
          
          <div></div> {/* Empty div to occupy 1/3 of the space on the right */}
        </div>
      </div>
    )
  );
}