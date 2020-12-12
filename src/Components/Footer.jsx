function Footer() {
  return (
    <footer>
      <button
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        Back to top
      </button>
    </footer>
  );
}

export default Footer;
