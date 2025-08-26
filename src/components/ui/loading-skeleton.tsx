import { cn } from '../../lib/utils'

interface LoadingSkeletonProps {
  className?: string
  lines?: number
  avatar?: boolean
}

export function LoadingSkeleton({ className, lines = 3, avatar = false }: LoadingSkeletonProps) {
  return (
    <div className={cn("animate-pulse space-y-4", className)}>
      {avatar && (
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-muted-200 rounded-full"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-muted-200 rounded w-1/4"></div>
            <div className="h-3 bg-muted-200 rounded w-1/2"></div>
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-muted-200 rounded"></div>
            {i === lines - 1 && (
              <div className="h-4 bg-muted-200 rounded w-5/6"></div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex space-x-4">
        <div className="h-8 bg-muted-200 rounded w-20"></div>
        <div className="h-8 bg-muted-200 rounded w-24"></div>
      </div>
    </div>
  )
}
