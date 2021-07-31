import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function NotFound() {
  const [timer, setTimer] = useState(3);
  const router = useRouter();
  useEffect(() => {
    const timeOut = () => {
      timer > 1 && setInterval(() => setTimer(timer - 1), 1000);
    };
    timeOut();
    return () => {
      clearInterval(timeOut);
    };
  }, [timer]);
  useEffect(() => {
    const redirect = () => setTimeout(() => router.push("/"), 3000);
    redirect();
    return () => {
      clearTimeout(redirect);
    };
  }, []);
  return (
    <div>
      <h3>Nothing found!</h3>
      <p>
        Being redirected to
        <Link href="/">
          <a>Homepage</a>
        </Link>{" "}
        in {timer} sec
      </p>
    </div>
  );
}

export default NotFound;
