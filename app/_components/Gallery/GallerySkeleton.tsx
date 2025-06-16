export default function GallerySkeleton() {
  return (
    <div className='animate-pulse'>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {[...Array(6)].map((_, i) => (
          <div key={i} className='h-64 bg-gray-200 rounded-lg' />
        ))}
      </div>
    </div>
  );
}
