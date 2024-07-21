import { BiUpArrowCircle } from "react-icons/bi";
import { FaFacebookF, FaLinkedinIn, FaPinterest, FaWifi } from "react-icons/fa";
import { TiSocialGooglePlus } from "react-icons/ti";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="flex items-center justify-between text-gray-500 px-32 py-10 border-t-2 relative bg-gray-100">
            <p className="uppercase text-sm">Powered by opencart bookstore &copy; 2024</p>
            <h1 className="italic text-xl font-bold">
                <span className="text-gray-700">Pay</span>
                <span>Pal</span>
            </h1>
            <ul className="flex items-center gap-4 text-lg">
                <li><a href=""><FaFacebookF /></a></li>
                <li><a href=""><TiSocialGooglePlus className="text-2xl" /></a></li>
                <li><a href=""><FaWifi className="rotate-45" /></a></li>
                <li><a href=""><FaPinterest /></a></li>
                <li><a href=""><FaLinkedinIn /></a></li>
            </ul>
        </footer>
    )
}