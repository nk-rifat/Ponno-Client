import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { getInitials } from "@/utils/getInitials";
import Image from "next/image";
import CustomersActions from "./CustomersActions";

const CustomersRow = ({ customer, onRefresh }) => {
  const fullName = `${customer?.firstName} ${customer?.lastName}`;
  return (
    <TableRow className="border-slate-800 hover:bg-slate-800/50">
      <TableCell>
        <div>
          {customer.profilePic ? (
            <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-gray-200 hover:ring-gray-00 transition-all duration-200">
              <Image
                src={customer.profilePic}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="bg-emerald-800 flex items-center justify-center text-white font-bold text-base w-9 h-9 rounded-full hover:bg-emerald-700">
              {getInitials(fullName)}
            </div>
          )}

          <div>
            <p className="font-medium text-white text-sm">{fullName}</p>
            <p className="text-xs text-slate-400">{customer.email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        {customer.isBlocked ? (
          <Badge variant="destructive">Blocked</Badge>
        ) : customer.isVerified ? (
          <Badge className="bg-green-900 text-green-300 hover:bg-green-900">
            Verified
          </Badge>
        ) : (
          <Badge className="bg-yellow-900 text-yellow-300 hover:bg-yellow-900">
            Unverified
          </Badge>
        )}
      </TableCell>

      <TableCell className="text-slate-400 text-sm hidden lg:table-cell">
        {new Date(customer.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </TableCell>
      <TableCell className="text-right">
        <CustomersActions customer={customer} onRefresh={onRefresh} />
      </TableCell>
    </TableRow>
  );
};

export default CustomersRow;
