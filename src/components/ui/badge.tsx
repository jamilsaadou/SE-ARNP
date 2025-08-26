import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-muted-200 text-muted-900",
        success: "border-transparent bg-success/10 text-success",
        warning: "border-transparent bg-warning/20 text-yellow-900",
        danger: "border-transparent bg-danger/10 text-danger",
        niger: "border-transparent bg-niger-orange/10 text-niger-orange",
        outline: "text-muted-900",
        // Fréquences
        "freq-mensuelle": "border-transparent bg-blue-50 text-blue-700",
        "freq-trimestrielle": "border-transparent bg-yellow-100 text-yellow-900",
        "freq-annuelle": "border-transparent bg-gray-100 text-gray-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
