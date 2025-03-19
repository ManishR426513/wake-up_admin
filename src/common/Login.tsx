import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { authAxios } from "@/config/config";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext"; // ✅ Corrected import
import { useNavigate } from "react-router-dom";
import { useAllContext } from "@/context/AllContext";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [userdata, setuserdata] = useState<{
    email: string;
    password: string;
  }>({
    email: "admin@gmail.com",
    password: "12345678",
  });

  const navigate = useNavigate();

  const { handleLogin } = useAuth();

  const {setloading}  =useAllContext()
  

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log("called");
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true)
    await authAxios()
      .post(`/auth/login`, userdata)
      .then((response) => {
        console.log("rewew", response);
        const resData = response.data;
        toast.success(resData.message);
        setloading(false)
        console.log("eeqweqw", response.data.data.user);
        handleLogin(response.data.data.user, response.data.data.token);
        navigate("/");
      })
      .catch((error) => {
        setloading(false)
        console.log("ererw", error);
        toast.error(error.response.data.message);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setuserdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="m@example.com"
                      required
                      value={userdata?.email}
                      // onChange={(e) =>
                      //   setuserdata((prev) => ({
                      //     ...prev,
                      //     email: e.target.value,
                      //   }))
                      // }
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        // href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      name="password"
                      value={userdata?.password}
                      onChange={(e) =>
                        setuserdata((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  {/* <Button variant="outline" className="w-full">
                    Login with Google
                  </Button> */}
                </div>
                {/* <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div> */}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
