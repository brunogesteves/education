interface closeModalNoAccessProps {
  closeModalNoAccess: (newState: boolean) => void;
}

export const ModalNoAccess: React.FC<closeModalNoAccessProps> = ({
  closeModalNoAccess,
}) => {
  return (
    <div className="fixed z-50 inset-0 ">
      <div className="bg-gray-500 opacity-70 h-full"></div>
      <div className="bg-white p-10 h-96 rounded m-auto fixed inset-0 max-w-2xl flex flex-col  justify-between items-center">
        <div className=" h-44 flex justify-between flex-col items-center">
          <img src="/logo.jpeg" alt="logo" width={100} height={100} />
          You don't have the authorization.
        </div>
        <button
          onClick={() => closeModalNoAccess(false)}
          className="px-3 py-1 bg-white border-2 rounded-md border-black text-black  hover:bg-red-500 hover:text-white"
        >
          close
        </button>
      </div>
    </div>
  );
};
