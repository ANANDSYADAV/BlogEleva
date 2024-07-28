import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsLinkedin, BsGithub, BsStackOverflow, } from 'react-icons/bs';
import { SiRapid, SiNpm } from "react-icons/si";
export default function FooterCom() {
    return (
        <Footer container className='border border-t-8 border-teal-500'>
            <div className='w-full max-w-7xl mx-auto'>
                <div className='flex w-full justify-center sm:flex md:grid-cols-1'>
                    <div>
                        <Link>
                            <span><img src="/logo.png" alt="logo.img" className='h-[200px] w-[300px] dark:bg-white' /></span>
                        </Link>
                    </div>
                </div>
                <Footer.Divider />
                <div className='w-full flex gap-6 mx-auto justify-center'>

                        <Footer.Icon target='_blank' href='https://www.linkedin.com/in/anand-yadav-08b7b2230/' icon={BsLinkedin} className='hover:text-blue-500'/>
                        <Footer.Icon target='_blank' href='https://github.com/ANANDSYADAV' icon={BsGithub} className='hover:text-gray-800'/>
                        <Footer.Icon target='_blank' href='https://rapidapi.com/user/anandyad2004' icon={SiRapid} className='hover:text-blue-700'/>
                        <Footer.Icon target='_blank' href='https://www.npmjs.com/~anandsyadav' icon={SiNpm} className='hover:text-red-700'/>
                        <Footer.Icon target='_blank' href='https://stackoverflow.com/users/22985848/anand' icon={BsStackOverflow} className='hover:text-orange-500'/>

                </div>
            </div>
        </Footer>
    );
}