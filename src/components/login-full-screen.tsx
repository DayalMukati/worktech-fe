'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks/toolKitTyped';
import { handleLogin } from '@/store/authSlice';

// Step 2: Define Zod schema for form validation
const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(5)
});
type Schema = z.infer<typeof loginSchema>;

// Adjusting the component to use React Hook Form
function LoginFullScreen() {
	const dispatch = useAppDispatch();
	// Step 3: Integrate React Hook Form with Zod schema
	const {
		register,
		handleSubmit,
		formState: { errors, isLoading }
	} = useForm<Schema>({
		resolver: zodResolver(loginSchema)
	});
	const router = useRouter();

	const onSubmit = (data: Schema) => {
		// console.log(data);
		// const token = action.payload.token;
		// localStorage.setItem('token', token);
		// router.push('/dashboard');
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='lg:grid lg:grid-cols-2 w-full lg:min-h-[600px] xl:min-h-[800px]'>
			<div className='flex justify-center items-center py-12'>
				<div className='gap-6 grid mx-auto w-[350px]'>
					<div className='gap-2 grid text-center'>
						<h1 className='font-bold text-3xl'>Login</h1>
						<p className='text-balance text-muted-foreground'>
							Enter your email below to login to your account
						</p>
					</div>
					<div className='gap-4 grid'>
						<div className='gap-2 grid'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								placeholder='m@example.com'
								{...register('email')}
							/>
							{errors.email && (
								<p className='text-red-500'>{errors.email.message}</p>
							)}
						</div>
						<div className='gap-2 grid'>
							<div className='flex items-center'>
								<Label htmlFor='password'>Password</Label>
								<Link
									href='/forgot-password'
									className='inline-block ml-auto text-sm underline'>
									Forgot your password?
								</Link>
							</div>
							<Input
								id='password'
								type='password'
								{...register('password')}
							/>
							{errors.password && (
								<p className='text-red-500'>
									{errors.password.message}
								</p>
							)}
						</div>
						<Button
							disabled={isLoading}
							type='submit'
							className='w-full'>
							{isLoading ? 'Loading' : 'Login'}
						</Button>
						{/* <Button variant='outline' className='w-full'>
							Login with Google
						</Button> */}
					</div>
					<div className='mt-4 text-center text-sm'>
						Don&apos;t have an account?{' '}
						<Link href='/auth/signup' className='underline'>
							Sign up
						</Link>
					</div>
				</div>
			</div>
			<div className='lg:block hidden bg-muted'>
				<Image
					src='/placeholder.svg'
					alt='Image'
					width='1920'
					height='1080'
					className='dark:brightness-[0.2] w-full h-full object-cover dark:grayscale'
				/>
			</div>
		</form>
	);
}

export default LoginFullScreen;
