import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Container from "@/components/Container";
import RegisterForm from "./form";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Register = async () => {
  const isAuth = await getServerSession(authOptions);

  if (isAuth) {
    redirect("/");
  }

  return (
    <Container className="h-screen flex items-center justify-center bg-white sm:bg-neutral-200 dark:bg-neutral-900">
      <div className="sm:shadow-xl sm:bg-white sm:dark:bg-neutral-950 w-full sm:w-auto rounded px-8 py-12 ">
        <h1 className="font-semibold text-2xl mb-10">Create an account</h1>
        <RegisterForm />
        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Register;
