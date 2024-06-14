import { shortenAddress } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export function HeaderBox({ identity }: { identity: any }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Kura Kani</h1>
      </div>
      <div className="flex gap-4 flex-row items-center">
        <Avatar className="h-8">
          <AvatarImage src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${identity.address}`} className="w-full" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {shortenAddress(identity.address)}
        <Button
          variant="ghost"
          onClick={() => {
            localStorage.removeItem("identity");
            window.location.reload();
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
