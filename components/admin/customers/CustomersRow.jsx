import { TableCell, TableRow } from "@/components/ui/table";
import { getInitials } from "@/utils/getInitials";
import Image from "next/image";

const CustomersRow = ({ customer, onRefresh }) => {
  const fullName = `${customer?.firstName} ${customer?.lastName}`;
  return (
    <TableRow>
      <TableCell>
        <div>
          {customer.profilePic ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-200 hover:ring-gray-400 transition-all duration-200">
              <Image
                src={customer.profilePic}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="bg-emerald-800 flex items-center justify-center text-white font-bold text-base w-10 h-10 rounded-full hover:bg-emerald-700">
              {getInitials(fullName)}
            </div>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CustomersRow;
