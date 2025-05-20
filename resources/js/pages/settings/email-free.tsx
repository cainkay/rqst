import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

const EmailFree: React.FC = () => {
    return (
        <div className="space-y-8">
            {/* Categories Section */}
            <section className="text-background mt-6 space-y-6">
                <h3 className="text-2xl font-bold uppercase">Email Notification</h3>
                {/* <div className='flex items-center space-x-2 '>
                    <Checkbox
                        id={`notifications`}
                        onCheckedChange={() => setData('notifications', !data.notifications)}
                        className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                    />
                    <label
                        htmlFor={`notifications`}
                        className="cursor-pointer  leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        
                        <span className="">Receive email notifications</span>
                    </label>
                </div> */}

                <div className="border-background max-w-sm space-y-4 border p-4">
                    <h3 className="text-2xl font-bold uppercase">NEED MORE?</h3>
                    <p className="text-thin">
                        Full members can access all previous streams, search and filter by date, local government area (LGA), state, and category.
                        They can save releases, and filter their email notifications
                    </p>

                    <Button type="button" asChild className=" text-background rounded-full uppercase">
                      <Link href={route('subscribe')} > LEARN MORE</Link>

                    </Button>
                </div>
            </section>
        </div>
    );
};

export default EmailFree;
