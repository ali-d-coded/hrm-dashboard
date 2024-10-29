"use client";

import { useActionState } from "react";
import { signup } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function SigninForm() {
  // @ts-expect-error - TypeScript cannot infer `state` structure from useActionState
  const [state, formAction, isPending] = useActionState(signup, {
    errors: {},
    message: "",
    success: false,
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="johndoe@example.com"
              required
              aria-describedby="email-error"
            />
            {/* @ts-expect-error - `state.errors.email` may not exist, depends on validation */}
            {state.errors.email && (
              <Alert variant="destructive" id="email-error">
                {/* @ts-expect-error - `state.errors.email` may be undefined */}
                <AlertDescription>{state.errors.email}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              aria-describedby="password-error"
            />
            {/* @ts-expect-error - `state.errors.password` may not exist, depends on validation */}
            {state.errors.password && (
              <Alert variant="destructive" id="password-error">
                <AlertDescription>
                  Password must:
                  <ul className="list-disc pl-5 mt-2">
                    {/* @ts-expect-error - `state.errors.password` may be undefined */}
                    {state.errors.password.map((error: string) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </div>

          {state.message && (
            <>
              {/* @ts-expect-error - `state.success` may be undefined */}
              <Alert variant={state?.success ? "default" : "destructive"}>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            </>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
