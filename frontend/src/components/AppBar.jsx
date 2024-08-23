export default function AppBar({user}) {
  return (
    <>
      <div className="flex justify-between items-center px-2 py-1">
        <div className="ml-2 mr-0 pr-2 pl-0 font-bold text-xl">Hello, {user.fName}</div>
        <div className="font-bold text-3xl">Pay_Front</div>
      </div>
    </>
  );
}
