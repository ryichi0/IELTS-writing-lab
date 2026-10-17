import PrimaryButton from '@/components/ui/PrimaryButton'
import PrimaryLink from '@/components/ui/PrimaryLink'
import { getCurrentUser } from '@/lib/auth';
import { safeNext } from '@/lib/safe-next';
import Image from 'next/image'
import LoginForm from '../_components/LoginForm';
import { redirect } from "next/navigation";


export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const safe = safeNext(next);

  if (await getCurrentUser()) redirect(safe); // قبلاً لاگین است

  return (
    <>
      <div className="flex flex-col gap-3 items-center">
        <Image src={"/auth-logo.svg"} alt={"logo"} width={48} height={48} />
        <div>
          <h1 className="text-black font-black text-xl text-center">Welcome to IELTS Writing Lab</h1>
          <p className="text-foreground-secondary text-body">Clean, focused practice for Task 1 candidates.</p>
        </div>
      </div>
      <LoginForm next={safe}  />
    </>
  )
}
