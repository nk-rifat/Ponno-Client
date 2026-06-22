import { verifyEmail } from "@/lib/api/auth";
export const metadata = {
  title: "Verify Email | Ponno",
  description: "Verify your email address to activate your Ponno account.",
};

export default async function VerifyEmailPage({ searchParams }) {
  const params = await searchParams;
  const token = params?.token;

  if (!token) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl text-red-600 font-bold">
          Invalid Verification Link
        </h1>
      </div>
    );
  }

  const data = await verifyEmail(token);

  return (
    <div className="container mx-auto py-20 text-center">
      {data.success ? (
        <>
          <h1 className="text-3xl font-bold text-green-600">
            Email Verified Successfully. <br /> Try Login Now.
          </h1>
          <p className="mt-4">{data.message}</p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-red-600">
            Verification Failed
          </h1>
          <p className="mt-4">{data.message}</p>
        </>
      )}
    </div>
  );
}
