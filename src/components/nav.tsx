import Link from "next/link";
import { FaUser } from "react-icons/fa6";

const Nav = () => {
  return (
    <nav
      className="
        flex items-center justify-between p-4 bg-white shadow-md"
    >
      <h1>Restraunt Name</h1>
      <Link href="/admin">
        <FaUser />
      </Link>
    </nav>
  );
};

export default Nav;
