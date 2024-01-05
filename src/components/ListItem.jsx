export default function ListItem({ image, text }) {
  return (
    <>
      <div className="flex flex-row items-center justify-center gap-2">
        <p>{image}</p>
        <p className="">{text}</p>
      </div>
    </>
  );
}
