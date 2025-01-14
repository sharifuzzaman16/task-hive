import { FaGithub, FaLinkedin, FaRegCopyright, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <div>
            <footer className="footer bg-white text-base-content p-10">
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
            <footer className="footer bg-white text-base-content border-base-300 border-t px-10 py-4">
                <aside className="grid-flow-col items-center">
                    <div className="">
                        <p>Task Hive</p>
                        <p className="flex items-center"><FaRegCopyright></FaRegCopyright> 2025 All Right reserved.</p>
                    </div>
                </aside>
                <nav className="md:place-self-center md:justify-self-end">
                    <div className="grid grid-flow-col gap-4">
                        <a href="https://github.com/sharifuzzaman16" target="_blank">
                            <FaGithub className="text-2xl cursor-pointer text-text-primary"></FaGithub>
                        </a>
                        <a href="https://www.linkedin.com/in/sharifuzzaman16" target="_blank">
                            <FaLinkedin className="text-2xl cursor-pointer text-text-primary"></FaLinkedin>
                        </a>
                        <a href="https://x.com/x_sharifuzzaman" target="_blank">
                            <FaXTwitter className="text-2xl cursor-pointer text-text-primary"></FaXTwitter>
                        </a>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;