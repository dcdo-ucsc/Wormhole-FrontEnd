

const InputGroupValidate = ({ name, label, error, ...rest }) => {
  return (
    <span className="mt-1 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
      Please enter a valid expiry time
    </span>
  );
};
