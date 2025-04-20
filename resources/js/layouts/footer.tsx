import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

const Footer = () => {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    return (
        <footer className="bg-black">
            <section className="off-center-container flex">
                <div className='text-background p-10 border-r border-background'>
                    <p>
                        You're seeing the 5 most recent releases <br/>
                        Sign up free to see more!
                    </p>
                    <p>
                       Unlock access-It's quick ,easy and free! 
                    </p>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
