import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <section className=' py-16 flex items-center justify-center'>
        <SignUp />
    </section>
  )
}