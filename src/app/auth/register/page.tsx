"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push("/auth/login");
    } else {
      const error = await res.json();
      alert(error.error);
    }
  });

  return (
    <div className="mt-8 h-[calc(100vh-7rem)] flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="flex justify-center items-center flex-col bg-slate-800 p-8 rounded-lg"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Register
        </h1>
        <input
          type="text"
          id="username"
          placeholder="Username"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must have at least 3 characters",
            },
          })}
          className="p-3 rounded block my-4 bg-slate-900 text-slate-300 focus:bg-slate-800"
        />
        {errors.username?.message && (
          <span className="text-red-500 text-sm">
            {errors.username.message as string}
          </span>
        )}
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
            minLength: {
              value: 6,
              message: "Password must have at least 6 characters",
            },
          })}
          className="p-3 rounded block my-4 bg-slate-900 text-slate-300 focus:bg-slate-800"
        />
        {errors.password?.message && (
          <span className="text-red-500 text-sm">
            {errors.password.message as string}
          </span>
        )}
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) =>
              value === getValues("password") || "The passwords do not match",
          })}
          className="p-3 rounded block my-4 bg-slate-900 text-slate-300 focus:bg-slate-800"
        />
        {errors.confirmPassword?.message && (
          <span className="text-red-500 text-sm">
            {errors.confirmPassword.message as string}
          </span>
        )}
        <button
          type="submit"
          className="w-full font-bold text-white p-3 rounded-lg my-5 bg-blue-600 active:bg-blue-700 hover:bg-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
