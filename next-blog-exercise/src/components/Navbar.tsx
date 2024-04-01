export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1> HotCoffee</h1>
      </div>
      <div className="menu">
        <span> Home </span>
        <span> Articles </span>
        <span>
          <img src="/instagram.svg" alt="instagram" />
        </span>
        <span className="">
          <img src="/twitter.svg" />
        </span>
        <span className="">
          <img src="/linkedin.svg" />
        </span>
      </div>
    </nav>
  );
}
