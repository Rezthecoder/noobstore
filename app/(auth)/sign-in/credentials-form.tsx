'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithCredentials } from "@/lib/actions/user.action";
import { signInDefaultValues } from "@/lib/constants";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const CredentialsSignInForm = () => {

    const [mounted, setMouted] = useState(false)

    const [data, action] = useActionState(signInWithCredentials, {
        success: false,
        message: ''
    })

    const SignInButton = () => {
        const { pending } = useFormStatus()
        return (
            <Button className="w-full" disabled={pending} variant="default">
                {pending ? 'Signing In...' : 'Sign In'}
            </Button>
        )
    }

    useEffect(() => {
        setMouted(true)
    }, [])

    if (!mounted) {
        return null;
    }
    return <form action={action}>
        <div className="space-y-6">
            <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required autoComplete="email"
                    defaultValue={signInDefaultValues?.email ?? ""}></Input>
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required autoComplete="password"
                    defaultValue={signInDefaultValues?.password ?? ''}></Input>
            </div>
            <div>
                {/* <Button className="w-full" variant="default">Sign In</Button> */}
                <SignInButton></SignInButton>
            </div>
            {data && !data.success && (
                <div className="text-center text-destructive">{data.message}</div>
            )}
            <div className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link className="link" href="/sign-up" target="_self">  Sign Up</Link>

            </div>
        </div>

    </form >;
}

export default CredentialsSignInForm;