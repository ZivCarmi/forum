"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { AlertCircle } from "lucide-react";

const RegisterForm = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          displayName,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await res.json();

      if (res.ok) {
        signIn();
      } else {
        setError(json.error);
      }
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <form className="space-y-6 sm:w-[450px]" onSubmit={submitHandler}>
      <div className="grid gap-2.5">
        <Label htmlFor="displayName">
          Display Name<span className="ml-1 text-red-600">*</span>
        </Label>
        <Input
          required
          type="displayName"
          id="displayName"
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>
      <div className="grid gap-2.5">
        <Label htmlFor="email">
          Email<span className="ml-1 text-red-600">*</span>
        </Label>
        <Input
          required
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid gap-2.5">
        <Label htmlFor="password">
          Password<span className="ml-1 text-red-600">*</span>
        </Label>
        <Input
          required
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button className="w-full" size="lg">
        Create account
      </Button>
    </form>
  );
};

export default RegisterForm;
