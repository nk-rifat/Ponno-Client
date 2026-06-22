import Field from "@/components/shared/Field";
import { categories } from "@/data/categories";

const ProductFormFields = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <Field
          label="Product Name"
          htmlFor="productName"
          error={errors.productName}
          labelClassName="text-gray-400"
        >
          <input
            id="productName"
            {...register("productName", {
              required: "Product name is required",
            })}
            placeholder="e.g. Cane Mirror"
            className="w-full px-4 py-2 bg-slate-900 border border-slate-600 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </Field>
      </div>

      <div className="md:col-span-2">
        <Field
          label="Description"
          htmlFor="description"
          error={errors.description}
          labelClassName="text-gray-400"
        >
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            rows={4}
            placeholder="Describe the product..."
            className="w-full px-4 py-2 bg-slate-900 border border-slate-600 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
          />
        </Field>
      </div>

      <Field
        label="Price (Tk)"
        labelClassName="text-gray-400"
        htmlFor="price"
        error={errors.price}
      >
        <input
          id="price"
          type="number"
          {...register("price", {
            required: "Price is required",
            min: { value: 1, message: "Price must be greater than 0" },
          })}
          placeholder="e.g. 1800"
          className="w-full px-4 py-2 bg-slate-900 border border-slate-600 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </Field>

      <Field
        label="Discount Price (Tk) "
        htmlFor="discountPrice"
        labelClassName="text-gray-400"
      >
        <input
          id="discountPrice"
          type="number"
          {...register("discountPrice")}
          placeholder="e.g. 1550 (optional)"
          className="w-full px-4 py-2 bg-slate-900 border border-slate-600 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </Field>

      <Field
        label="Stock"
        htmlFor="stock"
        error={errors.stock}
        labelClassName="text-gray-400"
      >
        <input
          id="stock"
          type="number"
          {...register("stock", {
            required: "Stock is required",
            min: { value: 0, message: "Stock cannot be negative" },
          })}
          placeholder="e.g. 10"
          className="w-full px-4 py-2 bg-slate-900 border border-slate-600 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </Field>

      <Field
        label="Category"
        htmlFor="category"
        error={errors.category}
        labelClassName="text-gray-400"
      >
        <select
          id="category"
          {...register("category", { required: "Category is required" })}
          className="w-full px-4 py-2 bg-slate-900 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">Select category</option>
          {Object.entries(categories).map(([value, label]) => (
            <option key={value} value={label}>
              {label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Sub Category"
        htmlFor="subCategory"
        error={errors.subCategory}
        labelClassName="text-gray-400"
      >
        <input
          id="subCategory"
          {...register("subCategory", { required: "Sub category is required" })}
          placeholder="e.g. Mirror"
          className="w-full px-4 py-2 bg-slate-900 border border-slate-600 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </Field>

      <Field
        label="Material"
        htmlFor="material"
        error={errors.material}
        labelClassName="text-gray-400"
      >
        <input
          id="material"
          {...register("material", { required: "Material is required" })}
          placeholder="e.g. Cane"
          className="w-full px-4 py-2 bg-slate-900 border border-slate-600 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </Field>

      <Field label="Size" htmlFor="size" labelClassName="text-gray-400">
        <input
          id="size"
          {...register("size")}
          placeholder="e.g. 16 inches"
          className="w-full px-4 py-2 bg-slate-900 border border-slate-600 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </Field>

      <Field label="Color" htmlFor="color" labelClassName="text-gray-400">
        <input
          id="color"
          {...register("color")}
          placeholder="e.g. Natural"
          className="w-full px-4 py-2 bg-slate-900 border border-slate-600 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </Field>

      <Field label="Shape" htmlFor="shape" labelClassName="text-gray-400">
        <input
          id="shape"
          {...register("shape")}
          placeholder="e.g. Round"
          className="w-full px-4 py-2 bg-slate-900 border border-slate-600 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </Field>
    </div>
  );
};

export default ProductFormFields;
