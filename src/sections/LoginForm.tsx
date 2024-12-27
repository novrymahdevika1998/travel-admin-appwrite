import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/context/JWTContext"
import { useState } from "react"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    await login({ email: username, password });
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleLogin}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Masuk ke akun anda</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Masukkan username dan password anda
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Masukkan username anda"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Masuk
        </Button>
      </div>
    </form>
  )
}
