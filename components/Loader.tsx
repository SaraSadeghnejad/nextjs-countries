import { Loader as Loading } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen animate-spin">
     <Loading className='text-2xl '/>
    </div>
  );
};

export default Loader;