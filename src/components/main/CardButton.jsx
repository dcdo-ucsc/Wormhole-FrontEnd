const CardButton = ({ image, alt, text, href }) => {
  return (
    <a
      className="card cursor-pointer card-compact rounded-3xl hover:bg-base-200 hover:bg-gray-500 hover:bg-opacity-10 transition-all duration-200 hover:-translate-y-1"
      href={href}
    >
      <figure className="px-4 pt-4">
        <img
          loading="lazy"
          src={image}
          className="pt-0 bg-base-300 rounded-lg scale-50 invert "
          alt={alt}
        />
      </figure>
      <div>
        <h2 className="text-xl hover:underline">{text}</h2>
      </div>
    </a>
  );
};
export { CardButton };
