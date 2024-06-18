export default function Footer() {
  return (
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 border-top">
      <p class="col-md-4 mb-0 sp">&copy; 2024 ERe, Inc</p>

      <span
        href="/"
        class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      ></span>

      <ul class="nav col-md-4 justify-content-end">
        <li class="nav-item">
          <span class="px-2 sp-small">Home</span>
        </li>
        <li class="nav-item">
          <span class=" px-2 sp-small">Features</span>
        </li>
        <li class="nav-item">
          <span class=" px-2 sp-small">Pricing</span>
        </li>
        <li class="nav-item">
          <span class=" px-2 sp-small">FAQs</span>
        </li>
        <li class="nav-item">
          <span class=" px-2 sp-small">About</span>
        </li>
      </ul>
    </footer>
  );
}
