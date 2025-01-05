"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState<string | null | undefined>(null);

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (res?.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setError(res?.error);
    }
  });

  return (
    <div className="mt-8 h-[calc(100vh-7rem)] flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="flex justify-center items-center flex-col bg-slate-800 p-8 rounded-lg"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Sign In
        </h1>
        <input
          type="email"
          id="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
          className="p-3 rounded block my-4 bg-slate-900 text-slate-300 focus:bg-slate-800"
        />
        {errors.email?.message && (
          <span className="text-red-500 text-sm">
            {errors.email.message as string}
          </span>
        )}
        <input
          type="password"
          id="password"
          placeholder="******"
          {...register("password", {
            required: "Password is required",
          })}
          className="p-3 rounded block my-4 bg-slate-900 text-slate-300 focus:bg-slate-800"
        />
        {errors.password?.message && (
          <span className="text-red-500 text-sm">
            {errors.password.message as string}
          </span>
        )}
        <button
          type="submit"
          className="w-full font-bold text-white p-3 rounded-lg my-5 bg-blue-600 active:bg-blue-700 hover:bg-blue-500"
        >
          Submit
        </button>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </form>
    </div>
  );
}

export default SignInPage;
