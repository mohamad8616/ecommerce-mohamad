import Image from "next/image";
import { Button } from "./components/ui/Button";

export default function Home() {
  return (
    <div className='h-screen w-screen bg-slate-100 dark:bg-slate-900 text-slate-100 dark:text-slate-200'>
      main page
      <Button variant='outline' className='cursor-pointer' size='default'>
        Click me
      </Button>
    </div>
  );
}
