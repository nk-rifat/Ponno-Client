import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const SpecRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <TableRow>
      <TableCell className="py-2.5 text-sm text-gray-500 w-1/3">
        {label}
      </TableCell>
      <TableCell className="py-2.5 text-sm text-gray-800 font-medium">
        {value}
      </TableCell>
    </TableRow>
  );
};

const ProductDetailsContent = ({ product }) => {
  return (
    <div className="space-y-6">
      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-800">
            Description
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </CardContent>
      </Card>

      {/* Specs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-800">
            Specifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <SpecRow label="Material" value={product.material} />
              <SpecRow label="Size" value={product.size} />
              <SpecRow label="Color" value={product.color} />
              <SpecRow label="Shape" value={product.shape} />
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetailsContent;
