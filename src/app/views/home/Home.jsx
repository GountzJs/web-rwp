import { Footer } from '../../components/layouts/footer/Footer';
import { Navbar } from "../../components/layouts/header/Navbar";
import { NavbarUser } from "../../components/layouts/header/NavbarUser";
import { LocalStorageService } from "../../core/services/LocalStorageService";

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