import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-xl text-sm font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg',
				destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md',
				outline:
          'border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground',
				secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
        'premium-primary': 
          'bg-gradient-to-r from-[#0F4C75] to-[#3282B8] text-white shadow-lg hover:shadow-[#0F4C75]/30 hover:shadow-xl hover:-translate-y-1 hover:brightness-110 border border-white/10',
        'premium-secondary': 
          'bg-gradient-to-r from-[#FFD93D] to-[#F4C430] text-[#0F4C75] shadow-lg hover:shadow-[#FFD93D]/30 hover:shadow-xl hover:-translate-y-1 hover:brightness-105 border border-white/20',
        'premium-accent': 
          'bg-gradient-to-r from-[#FF6B6B] to-[#EE5253] text-white shadow-lg hover:shadow-[#FF6B6B]/30 hover:shadow-xl hover:-translate-y-1 hover:brightness-110 border border-white/10',
			},
			size: {
				default: 'h-11 px-6 py-2',
				sm: 'h-9 rounded-lg px-4',
				lg: 'h-14 rounded-xl px-10 text-base',
				icon: 'h-11 w-11',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	const Comp = asChild ? Slot : 'button';
	return (
		<Comp
			className={cn(buttonVariants({ variant, size, className }))}
			ref={ref}
			{...props}
		/>
	);
});
Button.displayName = 'Button';

export { Button, buttonVariants };