export default function InputBar({ label, placeholder, onChange }) {
  return (
    <>
      <div>
        <label className="font-bold px-1 my-1 py-2" htmlFor={label}>
          {label}
        </label>
      </div>
      <div>
        <input
          className="border border-gray-300 rounded-md my-1 py-2 px-4 w-full"
          onChange={onChange}
          id={label}
          placeholder={placeholder}
        ></input>
      </div>
    </>
  );
}
