import { LoaderIcon } from 'lucide-react';
import { createContext, useState, FC, ReactNode, useContext } from 'react';

interface AllContextType {
  loading: boolean;
  setloading: (value: boolean) => void;
}

 const AllContext = createContext<AllContextType | null>(null);

interface AllContextProviderProps {
  children: ReactNode;
}


export const useAllContext = () => {
  const context = useContext(AllContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


export const AllContextProvider: FC<AllContextProviderProps> = ({ children }) => {
  const [loading, setloading] = useState<boolean>(false);

  return (
    <AllContext.Provider value={{ loading, setloading }}>
      {/* {loading && (
         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
       <LoaderIcon className="animate-spin" size={60} />
       </div>
      )} */}
      {children}
    </AllContext.Provider>
  );
};