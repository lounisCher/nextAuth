import { auth } from '@/server/auth'
import { UserButton } from './user-button';
import { Button } from '../ui/button';
import Link from 'next/link';
import {LogIn} from 'lucide-react'

export default async function Nav(){
    const session = await auth();
    return(
        <header className='bg-slate-200 py-4 px-4'>
            <nav>
                <ul className='flex justify-between'>
                    <li> Logo</li>
                    {!session ?(
                        <li>
                            <Button asChild>
                                <Link href="/auth/login" className='flex gap-4'>
                                    <LogIn/>
                                    <span>LogIn</span>
                                </Link>
                            </Button>
                        </li>
                    ):<li><UserButton expires={session?.expires} user={session?.user}/></li>}                    
                </ul>
            </nav>
        </header>
    )
}
