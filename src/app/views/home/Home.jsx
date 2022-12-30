import { Footer, Navbar, NavbarUser } from '@/app/components';
import { LocalStorageService } from "@/app/core";

export function Home() {
  const { isLogin } = LocalStorageService();

  return (
    <>
      {
        isLogin()
          ? <NavbarUser />
          : <Navbar />
      }
      <div>
        Home
      </div>
      <Footer />
    </>
  )
}