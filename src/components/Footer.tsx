export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-85">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} First App. All rights reserved.</p>
      </div>
    </footer>
  );
}