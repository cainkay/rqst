import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useGlobalStore } from '@/store/global';
import { router } from '@inertiajs/react';
import { XIcon } from 'lucide-react';

const PaywallDialog = () => {
    const {showPaywall, displayPaywall} = useGlobalStore()
    return (
        <Dialog open={showPaywall} onOpenChange={displayPaywall} >
            <DialogContent className="sm:max-w-3xl rounded-none bg-bright-blue" >
                <div className="grid gap-4 p-6 text-background text-center space-y-6">
                    <h3 className="text-3xl font-bold">ACCESS DENIED</h3>
                    <p className="text-2xl">
                    This option is only available in the Full Membership.
                    </p>
                    <Button
                    onClick={() => {
                        router.visit(route('subscribe'));
                        displayPaywall(false)
                    }}
                    variant={'secondary'} className='m-auto rounded-full text-xl px-10 py-5'>
                        LEARN MORE
                    </Button>

                    <Button variant={'ghost'} className='m-auto rounded-full text-lg px-5! py-5 border border-white hover:text-background' onClick={() => displayPaywall(false)}>
                       <XIcon/>
                        CLOSE
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PaywallDialog;
