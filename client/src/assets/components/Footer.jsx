import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsLinkedin, BsGithub, BsStackOverflow, } from 'react-icons/bs';
import { SiRapid, SiNpm } from "react-icons/si";
export default function FooterComponent() {
    return (
        <Footer container className='border border-t-8 border-b-8 border-teal-500'>
            <div className='w-full max-w-7xl mx-auto'>
                <div className='flex w-full justify-center sm:flex md:grid-cols-1'>
                    <Link>
                        <span><img src="/logo.png" alt="logo.img" className='h-[210px] w-[350px]' /></span>
                    </Link>
                </div>
                <Footer.Divider />
                <div className='w-full flex gap-6 mx-auto justify-center text-4xl text-slate-500'>

                    <a target='_blank' href='https://www.linkedin.com/in/anand-yadav-08b7b2230/' className='hover:text-blue-800'><BsLinkedin /></a>
                    <a target='_blank' href='https://github.com/ANANDSYADAV' className='hover:text-gray-600'><BsGithub /></a>
                    <a target='_blank' href='https://rapidapi.com/user/anandyad2004' className='hover:text-purple-800'><SiRapid /></a>
                    <a target='_blank' href='https://www.npmjs.com/~anandsyadav' className='hover:text-red-800'><SiNpm /></a>
                    <a target='_blank' href='https://stackoverflow.com/users/22985848/anand' className='hover:text-orange-600'><BsStackOverflow /></a>

                </div>
            </div>
        </Footer>
    );
}