import Navbar from '../components/Navbar';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container-custom py-8">
        <div className="card">
          <h1 className="text-2xl font-bold text-primary-600 mb-4">About Us</h1>
          <p className="text-gray-600">
            This is a dummy page to demonstrate navigation. Welcome to our application!
          </p>
        </div>
      </main>
    </div>
  );
}
